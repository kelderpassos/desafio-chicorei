#!/bin/bash

# instalacao e configuracao do cloudwatch agent
echo 'instala dependencias necessarias'
sudo dnf update -y
sudo dnf install -y amazon-cloudwatch-agent

echo 'configura e inicia cloudwatch agent'
sudo cp /opt/aws/amazon-cloudwatch-agent/etc/cloudwatch-config.json /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json
sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent

cat <<EOF | sudo tee /opt/aws/amazon-cloudwatch-agent/etc/cloudwatch-config.json
{
  "agent": {
    "metrics_collection_interval": 60,
    "logfile": "/opt/aws/amazon-cloudwatch-agent/logs/amazon-cloudwatch-agent.log"
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/syslog",
            "log_group_name": "/ec2/${LOG_GROUP}",
            "log_stream_name": "{instance_id}-syslog",
            "timestamp_format": "%Y-%m-%d %H:%M:%S"
          },
        ]
      }
    }
  },
  "metrics": {
    "aggregation_dimensions": [["InstanceId"]],
    "metrics_collected": {
      "cpu": {
        "measurement": ["cpu_usage_idle", "cpu_usage_iowait"],
        "metrics_collection_interval": 60
      },
      "mem": {
        "measurement": ["mem_used_percent"],
        "metrics_collection_interval": 60
      },
      "disk": {
        "measurement": ["disk_used_percent"],
        "metrics_collection_interval": 60,
        "resources": ["/"]
      },
      "net": {
        "measurement": ["net_bytes_sent", "net_bytes_recv"],
        "metrics_collection_interval": 60,
        "resources": ["eth0"]
      }
    }
  }
}
EOF