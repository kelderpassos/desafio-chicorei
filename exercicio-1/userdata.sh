#!/bin/bash

echo 'instala dependencias necessarias'
sudo dnf update -y
sudo dnf install httpd mariadb105 php php-cli php-mysqlnd php-mbstring php-xml -y
sudo dnf install  -y

echo 'inicia apache'
sudo systemctl start httpd && sudo systemctl enable httpd

echo 'instala wordpress'
curl -O https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
sudo cp -r wordpress/* /var/www/html/
sudo cp /var/www/html/wp-config-sample.php /var/www/html/wp-config.php

echo 'executa wordpress sobre com apache como usuario'
sudo chown -R apache:apache /var/www/html/
sudo rm -rf wordpress lastest.tar.gz
sudo systemctl restart httpd.service