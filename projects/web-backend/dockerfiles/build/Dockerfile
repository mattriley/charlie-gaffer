FROM node:6.10.3

RUN apt-get update
RUN apt-get install -y python python-dev python-pip python-virtualenv
RUN pip install awscli
RUN apt-get install -y jq

CMD /bin/bash