# Exercícios 3, 6, 7, 8, 9, 10 e 11

## Exercício 3 - Continuidade de Negócio
Descreva um plano básico para garantir a continuidade dos serviços críticos no AWS em caso de falha na região principal. Que serviços você usaria e como os configuraria?

R: Um plano básico que eu configuraria para Recuperaçao de Disastres envolveria serviços como AWS Backup, Route 53 failover, RDS Cross-Region Read Replicas, Elastic Load Balancer e CloudFormation.
O AWS Backup permite criar cópias (snapshots) frequentes de bancos de dados e armazená-las em outras regiões. Para o caso da região principal cair, a restauração destas cópias pode ser feita no banco de dados da região escolhida.

RDS Cross-Region Read Replicas permite que dados do banco de dados principal sejam enviados automaticamente para a réplica e migre um banco de dados existente para uma nova região.

Com o Elastic Load Balancer é possível apontar tráfego entre instâncias de múltiplas regiões. Caso alguma instância caia, o tráfego é redirecionado p/ as outras. Parecido com isso, o Route 53 failover realiza verificações de integridade em servidores e responde consultas de DNS somente com aqueles em funcionamento.

CloudFormation (ou Terraform) permite a implantação de recursos em várias regiões, de modo que você conseguiria replicar aplicações e apontar para elas se necessário.

## Exercício 6 - Continuidade de Negócio
Quais práticas de segurança você aplicaria para garantir que dados armazenados no S3 sejam acessados apenas por usuários autorizados? (Inclua política de bucket exemplo).

R: Fundamentalmente criar uma política de bucket que escolha usuários ou grupos autorizados a acessá-los. Por exemplo:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                  "arn:aws:iam::123456789012:user/kelder.passos",
                  "arn:aws:iam::987654321098:group/cloud-engineers"
                ]
            },
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::chicorei-terraform-state",
                "arn:aws:s3:::chicorei-terraform-state/*"
            ]
        }
    ]
}


## Exercício 7 - Otimização de Performance
Descreva procedimentos ou configurações específicas para otimizar a performance de uma aplicação web que seja acessada por milhares de usuários simultaneamente, considerando cache com e armazenamento estático.

R: A nível de distribuição, é possível configurar o CloudFront para distribuir conteúdo abusando de recursos como edge locations e cacheamento através da configuração de TTLs. Se os dados acessados pela aplicação estiverem no RDS, Read Replicas ajudariam a melhorar a performance de leitura e para dados dinâmicos daria pra usar ElastiCache com Redis ou Memcached Para armazenamento estático, admito que S3 Transfer Acceleration seria a solução mais indicada.

## Exercício 8 - Resolução de Problemas
Diante de logs que indicam falha intermitente em um serviço, que passos você seguiria para diagnosticar e solucionar o problema? Inclua como você usaria as ferramentas.

R: Eu centralizaria os logs no CloudWatch para poder analisar as mensagens de erro e descobrir padrões nelas. Uma maneira de fazer isso seria fazer uso do Log Insights para pesquisar termos-chave nas mensagens de erro. Outra ferramenta passível de ser usada é o X-Ray para verificar onde está o gargalo e falhas em APIs e outros serviços.

## Exercício 9 - Lambda e EC2
Explique a diferença entre EC2 e Lambda e em quais cenários você usaria cada um.

R: Ambos são serviços da AWS voltados para computação, mas com diferenças fundamentais entre si. O EC2 trata-se de um servidor virtual gerenciado diretamente pelo cliente que escolhe o tipo de máquina, SO e cuida de como escalar e ficar disponível. Já a Lambda trata-se de um serviço Serverless, ou seja, sem a configuração e gerenciamento de servidores pelo cliente, onde este escolhe configurações mínimas como memória e eventos de gatilho. A gestão do serviço fica por conta da AWS.

Eu usaria Lambda para lidar com aplicações/serviços dependentes de eventos, integrar serviços da AWS (Lambda é a "cola" que faz os serviços dialogarem) e seguir um padrão serverless de arquitetura (integrar Lambda com API Gateway e DynamoDB, por exemplo).

Eu usaria o EC2 para aplicações web mais complexas como um e-commerce que roda em Java integrado com um banco de dados autogerido Postgres ou um aplicação de transmissão contínua (streamming de vídeos/jogos, homebrokers e etc).

## Exercício 10 - Automação
Dê exemplos de tarefas repetitivas que poderiam ser automatizadas em um pipeline CI/CD. Explique como isso pode melhorar a eficiência e confiabilidade do processo.

R: Análises de código estáticas de segurança (SAST) são um exemplo de tarefa que pode ser inserida num pipeline CI/CD e que são impraticáveis fora deste cenário. Não há como exigir do dev rodar na máquina um Snyk ou Semgrep antes de subir o código pro GitHub e pre-commit é, apesar de bom, é limitado se comparado ao GitHub Actions. Uma ação pode ser configurada de várias formas, ser integrada com outras ferramentas como a AWS, bloquear PRs e mesclagem de branches, de modo que somente o aquilo que foi configurado irá ser integrado ao raíz do código-fonte. Não há exemplo melhor e eficiência e confiabilidade que automatizar uma análise e garantir que somente aquilo que você tenha configurado, passe.

## Exercício 11 - Experiência Profissional
Descreva uma experiência em que você teve que implementar uma solução de infraestrutura crítica. Quais desafios enfrentou e como os superou?

R: Precisei fazer a migração do front-end hospedado na Vercel para a AWS em produção na