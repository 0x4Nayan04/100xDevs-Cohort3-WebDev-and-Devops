const express = require('express');

const app = express();

app.use(express.json());

let users = [
  {
    name: 'John',
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.get('/', function (req, res) {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  const numberOfHealthyKidneys = johnKidneys.filter(
    (kidney) => kidney.healthy
  ).length;
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

app.post('/', function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });

  res.json({
    message: 'Kidney Added Successfully!',
  });
});

app.put('/', function (req, res) {
  if (isThereAtleastOneUnhealthyKidney()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      users[0].kidneys[i].healthy = true;
    }

    res.json({
      message: 'Kidney Replaced Successfully!',
    });
  } else {
    res.status(411).json({
      message: 'You have no unhealthy kidney to replace',
    });
  }
});

app.delete('/', function (req, res) {
  if (isThereAtleastOneUnhealthyKidney()) {
    const newKidneys = [];

    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }

    users[0].kidneys = newKidneys;

    res.json({
      message: 'Unhealthy Kidney Removed Successfully!',
    });
  } else {
    res.status(411).json({
      message: 'You have no unhealthy kidney to remove',
    });
  }
});

function isThereAtleastOneUnhealthyKidney() {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      return true;
    }
  }
  return false;
}

app.listen(3000);
