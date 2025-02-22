# Exercício 1

### Descrição
Crie uma configuração básica utilizando o uma ferramenta de IaC para provisionar uma instância EC2 com RDS (MySQL) e S3 dentro da AWS. Providencie políticas básicas de segurança para acessar a instância.

### Resultado
O projeto foi desenvolvido em Terraform e conta com scripts em arquivos referentes às configurações pedidas.

No arquivo main.tf há a configuração global deste projeto, onde está configurado o provedor (AWS), back-end, variáveis locais,

O arquivo instances.tf contém o script necessário para a criação das instâncias EC2 e RDS, que conta com userdata.sh (configurar o EC2 com MySQL) e função (Role) a ser assumida pela instância.

A configuração de acesso da instância está no arquivo iam.tf que tem definido a política de acesso ao bucket S3, a função que recebe a política e que serviço assumirá a função (Assume Role).

O bucket S3 por sua vez está no arquivo s3.tf que o cria e define que somente o EC2 com a função específica criada acima pode acessar o bucket.

No arquivo vpc.tf está a configuração para acesso ao EC2 e ao RDS foi criada uma VPC, 3 subnets (1 pública p/ EC2 e 2 privads para o RDS), security group para o EC2 (habilita entrada p/ SSH e HTTPS e saída HTTPS) e o RDS (habilita entrada do EC2 pela porta 3306 e saída p/ ele em qualquer porta), internet gateway e route table para habilitar o EC2 a acessar a internet e nat gateway e elastic ip para habilitar o RDS de fazer o mesmo, mas sem poder ser acessada através dela.

Por fim, nos arquivos data.tf, variables.tf e outputs.tf respectivamente há:
- data resources para serem usados globalmente;
- variáveis de projeto configuradas no arquivo terraform.tfvars
- saídas dos recursos instanciados pelo script 