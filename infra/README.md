# EC2 deployment

The CloudFormation template creates one Ubuntu EC2 instance, a public subnet, an encrypted 40 GB gp3 volume, an Elastic IP, an SSM-enabled instance role, and a security group that exposes only HTTP publicly. SSH is allowed only from `SshCidr`.

The instance clones the repository, builds the React image, and starts these containers:

- `edge`: the only public container. It is Nginx and applies per-IP request and connection limits.
- `site`: the Vite production build served by Nginx.
- `grafana`: Grafana OSS with the provisioned learning dashboard.
- `prometheus`, `loki`, `tempo`: local telemetry stores used as Grafana data sources.

## Deploy

### Local Docker smoke test

```bash
GRAFANA_ADMIN_PASSWORD='replace-with-a-long-password' docker compose up -d --build
```

Open `http://localhost/` for the site and `http://localhost/practice` for the
Grafana OSS dashboard. When running Vite separately, start the stack first so
the `/grafana` development proxy can reach `localhost:3000`.

```bash
aws cloudformation deploy \
  --stack-name observability-learning \
  --template-file infra/cloudformation/observability-ec2.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    RepositoryUrl=https://github.com/OWNER/REPOSITORY.git \
    RepositoryBranch=main \
    GrafanaAdminPassword='replace-with-a-long-password' \
    SshCidr='203.0.113.10/32'
```

The repository must be reachable by the instance. For a private repository, replace the bootstrap clone step with an SSM or CodeDeploy delivery path; do not put a Git token in the template.

Get the URLs with:

```bash
aws cloudformation describe-stacks --stack-name observability-learning \
  --query 'Stacks[0].Outputs'
```

Nginx limits ordinary site traffic to 12 requests/second per IP with a burst of 30, Grafana traffic to 8 requests/second per IP with a burst of 20, and concurrent connections to 24 per IP. These are edge protection defaults, not capacity measurements; tune them after observing real traffic.
