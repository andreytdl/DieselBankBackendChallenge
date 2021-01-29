# DieselBankBackendChallenge

## Running
To run the application you must:
<br>
1 - Install the packages running:
~~~bash
yarn
~~~
or
~~~bash
npm install
~~~
<br>
2 - Open 2 terminals
<br>

3 - On the first terminal you run
~~~bash
yarn dev:server
~~~

4 - The transaction will not be sincronized yet, so if you send a get request for the url <i>http://localhost:3333/notify</i> you will receive
~~~javascript
    {
        balance: 0
    }
~~~

5 - On the second terminal you run
~~~bash
yarn cronjob
~~~

The cronjob will be fired once a minute and you will see notifications in both terminals.
<br>
You can simulate the webhook if you send a post notification to 
~~~bash
http://localhost:3333/notify
~~~

6 - The transaction will be sincronized now, so if you send a get request for the url <i>http://localhost:3333/notify</i> you will receive
~~~javascript
    {
        balance: 1000
    }
~~~

7 - To run the tests i made you can execute:
~~~bash
yarn test
~~~