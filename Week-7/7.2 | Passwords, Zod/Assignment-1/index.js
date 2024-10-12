//// Assignment #1 - Add validations to ensure email and password are correct format using Zod. Check the password has minimum 1 Uppercase character, 1 Special Character, 1 number and lowercase character.

const express = require('express');
const { UserModel, TodoModel } = require('./db');
const { auth, JWT_SECRET } = require('./auth');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const z = require('zod');
mongoose.connect('');

const app = express();
app.use(express.json());

app.post('/signup', async function (req, res) {
  try {
    const passwardValidationSchema = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{3,}$/
    );
    const requiredBody = z.object({
      email: z.string().min(3).max(100).email(),
      name: z.string().min(3).max(100),
      password: z
        .string()
        .min(3, 'Password must be at least 8 characters long')
        .max(100, 'Password must be less than 100 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(
          /[!@#$%^&*(),.?":{}|<>]/,
          'Password must contain at least one special character'
        ),
    });
    // const parsedData = requiredBody.parse(req.body);
    //this the formate is correct then everything is good but something wrong happen then it will stop the execution, You need to put in the the try catch block for working.
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
      res.json({
        message: 'Incorrect creds',
        error: parsedDataWithSuccess.error,
      });
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hasedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      email: email,
      password: hasedPassword,
      name: name,
    });

    res.json({
      message: 'You are signed up',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Error while signing up',
    });
  }
});

app.post('/signin', async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
  });
  const passwardMatch = await bcrypt.compare(password, response.password);
  if (response && passwardMatch) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: 'Incorrect creds',
    });
  }
});

app.post('/todo', auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: 'Todo created',
  });
});

app.get('/todos', auth, async function (req, res) {
  const userId = req.userId;

  const todos = await TodoModel.find({
    userId,
  });

  res.json({
    todos,
  });
});

app.listen(3000);
