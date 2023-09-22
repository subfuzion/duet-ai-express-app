# Node.js express-app with Duet AI

This README is a walkthrough that demonstrates using Duet AI to generate a basic Express web app with routes and tests.

**Every comment in the source code below is a prompt that results in Duet AI code generation after pressing Ctrl-Enter.** All of the code you see, except for the HTML, was generated by Duet AI following each prompt.

Duet AI works with Visual Studio Code, WebStorm, and Cloud Workstations. It's free during the public preview.

- Duet AI [information and sign up](https://cloud.google.com/duet-ai)
- Visual Studio Code theme for highlighting AI prompts: [ai-zen-mode](https://marketplace.visualstudio.com/items?itemName=tonypujals.ai-zen-mode)

## Create a simple Node.js web app with the Express framework

Create an empty directory. Add two empty files:

```
$ touch app.js test.js
```

Start developing by asking a question in the Duet AI chat panel:

**Duet AI chat question:**

> What is the command to install express and ejs packages for node.js?

**Duet AI chat response**:

> You can install the express and ejs packages for Node.js using the following command:
> 
> ```
> npm install express ejs
> ```
> 
> Once you have installed the packages, you can require them in your app.js file. For example,
> the following code requires the express and ejs packages:
> 
> ```
> const express = require('express');
> const ejs = require('ejs');
> ```
> 
> You can then use the express and ejs packages to create an express app with ejs template engine.
> For example, the following code creates an express app with ejs template engine:
> 
> ```
> const express = require('express');
> const ejs = require('ejs');
> 
> const app = express();
> app.set('view engine', 'ejs');
> ```

**End of chat**

Follow the prompt instructions and add the suggested code to **app.js**.

## Duet AI prompts

In the following source code, **all** comments are prompts that trigger Duet AI code generation by pressing **Ctrl-Enter** at the end of the comment. There can be a short delay before proposed code appears; to accept the proposed code, press the tab key.

> Note that if using the vim keymap, you need to be in **insert mode**.

[app.js]

```
// add urlencoded middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// define the home route
app.get('/', (req, res) => {
  res.render('index');
});

// create a /greeting POST route with a `name` parameter
app.post('/greeting', (req, res) => {
  const name = req.body.name || 'World';
  res.render('greeting', { name });
});

// start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log('Press Ctrl+C to quit.');
});

// create a /greeting route that accepts a name parameter
app.get('/greeting/:name', (req, res) => {
  res.render('greeting', { name: req.params.name });
});

// write package.json start script
{
  "scripts": {
    "start": "node app.js"
  }
}
```

**Copy the above start script and paste into package.json. Delete it from app.js. Confirm that package.json looks like this now (don't forget comma):**

[package.json]

```
{
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "ejs": "^3.1.9",
    "express": "^4.18.2"
  }
}
```

## Create a views directory for ejs templates

```
$ mkdir views
$ touch views/index.ejs views/greeting.ejs
```

Add the following HTML templates:

[views/index.json]

```
<HTML>
<BODY>
    <form action="/greeting" method="post">
        <label for="name">What's your name?</label>
        <input type="text" id="name" name="name" autofocus />
        <button type="submit">Submit</button>
    </form>
</BODY>
</HTML>
```

[views/greeting.js]

```
<HTML>
<BODY>
    <a href="/">Home</a>
    <p>Hello <%= NAME %>!</p>
</BODY>
</HTML>
```

## Run the app

```
$ npm start

> start
> node app.js

App listening on port 8080
Press Ctrl+C to quit.
```

Confirm the app works as expected in the browser. 🎉

## Add a test

At the bottom of **app.js**, add the following prompts:

[app.js]

```
// export app for testing
module.exports = app;

// create app tests
const assert = require('assert');
const request = require('supertest');

describe('Express App', () => {
  it('should return a 200 status code for the / route', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.statusCode, 200);
  });

  it('should render the index page for the / route', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.text, '<h1>Hello World!</h1>');
  });

  it('should return a 200 status code for the /greeting route', async () => {
    const response = await request(app).post('/greeting');
    assert.strictEqual(response.statusCode, 200);
  });

  it('should render the greeting page for the /greeting route', async () => {
    const response = await request(app).post('/greeting');
    assert.strictEqual(response.text, '<h1>Hello World!</h1>');
  });
});
```

Then:

- Leave the `module.exports` statement, but cut the test code and paste into **test.js**.
- Delete the second test (it's not correct).

After pasting the code into **test.js**, add a prompt at the top of the file to have Duet AI generate the code to import the app:

[test.js]

```
// import app
const app = require('./app');
```

To run tests, install the mocha test package, plus supertest, which is used
by the tests. (The assert package is part of the core library and doesn't need to be installed).

```
$ npm i mocha supertest
```

Update **package.json** to add a `test` script. It should now look like this:

[package.json]

```
{
  "scripts": {
    "start": "node app.js",
    "test": "mocha"
  },
  "dependencies": {
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "mocha": "^10.2.0",
    "supertest": "^6.3.3"
  }
}
```

Now run the tests:

```
$ npm test
```

The third test fails because it's a bit too strict about whitepspace. Modify the code as follows. By the time you enter `text.`, Duet AI will offer to complete it for the expected string:

[test.js]

```
    assert.ok(response.text.includes('<h1>Hello World!</h1>'));
```

That's great, it tested the default response when no `name` was provided, but ask Duet AI to test with a specific name using urlencoding (the form default):

[test.js]

```
  // add a /greeting test with a urlencoded name parameter
  it('should render the greeting page for the /greeting route with a urlencoded name parameter', async () => {
    const response = await request(app).post('/greeting').send('name=John');
    console.error(response.text);
    assert.ok(response.text.includes('<h1>Hello John!</h1>'));
  });
```

if you want JSON encoding, go back to **app.js** and add the json middleware
after the urlencoding middleware:

[app.js]

```
// add json middleware to parse json data
app.use(express.json());
```

Then in **test.js**, ask Duet AI to create another test:

[test.js]

```
  // add a /greeting test with a json encoded name parameter
  it('should render the greeting page for the /greeting route with a json encoded name parameter', async () => {
    const response = await request(app).post('/greeting').send({name: 'John'});
    assert.ok(response.text.includes('<h1>Hello John!</h1>'));
  });
```

And now there are five testes passing!

```
$ npm test

> test
> mocha

App listening on port 8080
Press Ctrl+C to quit.


  Express App
    ✔ should return a 200 status code for the / route
    ✔ should return a 200 status code for the /greeting route
    ✔ should render the greeting page for the /greeting route
    ✔ should render the greeting page for the /greeting route with a urlencoded name parameter
    ✔ should render the greeting page for the /greeting route with a json encoded name parameter


  5 passing (22ms)
```

## Add a JSON API

[app.js]

```
// add POST /api/echo to echo request body
app.post('/api/echo', (req, res) => {
  res.json(req.body);
});
```

[test.js**]

```
  // add POST /api/echo test
  it('should return a 200 status code for the /api/echo route', async () => {
    const response = await request(app).post('/api/echo');
    assert.strictEqual(response.statusCode, 200);
  });

  it('should return the request body for the /api/echo route', async () => {
    const response = await request(app).post('/api/echo').send({name: 'John'});
    assert.strictEqual(response.text, JSON.stringify({name: 'John'}));
  });
```

Now rerun the tests:

```
$ npm test

> test
> mocha

App listening on port 8080
Press Ctrl+C to quit.


  Express App
    ✔ should return a 200 status code for the / route
    ✔ should return a 200 status code for the /greeting route
    ✔ should render the greeting page for the /greeting route
    ✔ should render the greeting page for the /greeting route with a urlencoded name parameter
    ✔ should render the greeting page for the /greeting route with a json encoded name parameter
    ✔ should return a 200 status code for the /api/echo route
    ✔ should return the request body for the /api/echo route


  7 passing (24ms)
  ```

## Deploy to Cloud Run

Let's deploy the app to Cloud Run. You can ask Duet AI for help using a comment prompt in your code or ask in the chat panel. In the following, a comment prompt was used; the second comment is what Duet AI generated.

[app.js]

```
// deploy to cloud run from source
// gcloud run deploy express-api --source . --region us-central1 --platform managed --allow-unauthenticated
```

Copy and run the `gcloud run` command in your terminal.

> If you haven't already set the default gcloud project, then add it as as an option to the end of the command as shown below.

```
$ gcloud run deploy express-api --source . \
        --region us-central1 \
        --platform managed \
        --allow-unauthenticated \
        --project airy-sled-390522

This command is equivalent to running `gcloud builds submit --pack image=[IMAGE] .` and `gcloud run deploy express-api --image [IMAGE]`

Building using Buildpacks and deploying container to Cloud Run service [express-api] in project [airy-sled-390522] region [us-central1]
✓ Building and deploying new service... Done.
  ✓ Uploading sources...
  ✓ Building Container... Logs are available at [https://console.cloud.google.com/cloud-build/builds/714a9ce3-5c8a-4ad7-b56d-f42c5c63b4c3?project=
  948571094724].
  ✓ Creating Revision...
  ✓ Routing traffic...
  ✓ Setting IAM Policy...
Done.
Service [express-api] revision [express-api-00001-cit] has been deployed and is serving 100 percent of traffic.
Service URL: https://express-api-imhauua6kq-uc.a.run.app
```

Success! 🚀
