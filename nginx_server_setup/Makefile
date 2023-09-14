.PHONY: proxy docker

proxy:
        docker-compose --project-name proxy -f docker-compose.yml up -d --build --remove-orphans

docker:
        apt update -y
        apt install apt-transport-https curl gnupg-agent ca-certificates software-properties-common -y
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
        apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-compose -y
        systemctl start docker