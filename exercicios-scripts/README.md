# Exercícios 1, 2 e 4

## Exercício 1 - Infraestrutura AWS
Crie uma configuração básica utilizando o uma ferramenta de IaC para provisionar uma instância EC2 com RDS (MySQL), S3 e CloudWatch log group dentro da AWS. Providencie políticas básicas de segurança para acessar a instância.

## Exercício 2 - Infraestrutura como Código (IaC)
Utilize uma ferramenta de IaC para criar um load balancer na AWS que distribui o tráfego entre duas instâncias EC2. Explique o processo e as decisões de configuração no README. Explique porque escolheu a ferramenta de IaC usada.

## Exercício 4 - Monitoramento e Logging
Configure uma solução de monitoramento para uma instância EC2 utilizando AWS CloudWatch. Colete métricas básicas (CPU, memória) e registre logs da aplicação simulada.


### Resultado
O projeto foi desenvolvido em Terraform e conta com scripts em arquivos referentes às configurações pedidas. A escolha por Terraform se deu devido aos seguintes fatores:

- É a tecnologia de IaC mais amplamente adotada no mercado devido a sua robustez e versatilidade. Com isso, o nível de suporte e conteúdo a respeito dela é gigante.
- Terraform realiza chamadas de API para a AWS enquanto que o CloudFormation, um IaC nativo da AWS, utiliza processos internos para instanciar a infra. O processamento via chamadas de API é muito mais rápido, portanto, Terraform cria e destroi serviços numa velocidade maior que o CloudFormation.
- O gerenciamento de estado no Terraform é superior no meu entender ao do CloudFormation, de modo que você consegue depurar erros mais facilmente (quem já lidou com rollback do CloudFormation entende isso).

Sobre os scripts, no arquivo main.tf há a configuração global deste projeto, onde está configurado o provedor (AWS), back-end, variáveis locais,

O arquivo instances.tf contém o script necessário para a criação do RDS e das instâncias EC2, que conta com userdata.sh (atualiza o SO e instala e configura o CloudWatch Agent) e função (Role) a ser assumida pela instância. Para garantir que as instâncias EC2 tenham seu tráfego distribuído igualmente e que este seja criptografado em trânsito com o protocolo SSL/TLS, no arquivo alb.tf há a configuração de um application load balancer para isso.

A configuração de acesso da instância está no arquivo iam.tf que tem definido uma política de acesso ao bucket S3, uma política de permissões ao CloudWatch Agent, a função que recebe as políticas e que serviço assumirá a função (Assume Role).

O arquivo cloudwatch.tf cria o grupo de logs (log group) que receberá as métricas de CPU, memória, disco e rede do CloudWatch Agent ativo e configurado no EC2.

O bucket S3 por sua vez está no arquivo s3.tf que o cria e define que somente o EC2 com a função específica criada acima pode acessar o bucket.

No arquivo vpc.tf está a configuração para acesso ao EC2 e ao RDS foi criada uma VPC, 3 subnets (1 pública p/ EC2 e 2 privads para o RDS), security group para o EC2 (habilita entrada p/ SSH e HTTPS e saída HTTPS) e o RDS (habilita entrada do EC2 pela porta 3306 e saída p/ ele em qualquer porta), internet gateway e route table para habilitar o EC2 a acessar a internet e nat gateway e elastic ip para habilitar o RDS de fazer o mesmo, mas sem poder ser acessada através dela.

Por fim, nos arquivos data.tf, variables.tf e outputs.tf respectivamente há:
- data resources para serem usados globalmente;
- variáveis de projeto configuradas no arquivo terraform.tfvars
- saídas dos recursos instanciados pelo script 

### Instalação
Rode `terraform init -backend-config='./backend/dev.hcl'`. É importante que as credenciais [default] no arquvivo credentials estejam atualizadas.

Depois rode `terraform plan` para verificar que alterações serão feitas. Neste momento é importante verificar se os valores do arquivo terraform.tfvars existem e estão corretos. Deixei um arquivo terraform.tfvars.example para demonstrar quais variáveis serão necessárias.

Após a validação, rode `terraform apply` para aplicar as alterações e subir os serviços.
