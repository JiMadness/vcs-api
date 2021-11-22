FROM nikolaik/python-nodejs

WORKDIR /code/

COPY . .
RUN npm install
RUN pip install hestia_earth.utils
RUN pip install pandas~=1.2.0

EXPOSE 3000

RUN npm test

CMD ["npm", "start"]
