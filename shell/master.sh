set -e

export TF_VAR_BUILD=master
yarn gulp build
yarn jest
yarn codecov
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
