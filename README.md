# What's this?

This is a NodeJS version API about [the-majesty-of-vuejs-2](https://github.com/hootlex/the-majesty-of-vuejs-2/tree/master/apis).

## Requirements

Install the v10.16.0 version of NodeJS ([Link!](https://nodejs.org/dist/v10.16.0/))

# How to use?

Clone this project, install dependencies and just run.

```
$ git clone https://github.com/hun-a/the-majesty-of-vuejs-apis.git
$ cd the-majesty-of-vuejs-apis
$ npm install
$ npm run start
```

# Note

If you pass no parameters when call the `GET /api/stories`, you can get datas like as below format.

```
[
  {
    id: 1,
    plot: "Ahh, hard to see, the Dark Side is.",
    upvotes: 421,
    writer: "Yoda"
  },
  {
    id: 2,
    plot: "The Force is strong with you. A powerful Sith you will become. Henceforth, you shall be known as Darth… Vader.",
    upvotes: 729,
    writer: " Darth Sidious"
  },
  {
    id: 3,
    plot: "Mmm. Lost a planet, Master Obi-Wan has. How embarrassing.",
    upvotes: 800,
    writer: "Yoda"
  },
  ...
]
```

But if you pass the `page` parameter into the  `GET /api/stories` then  you can get datas for pagination like as below format.

```
{
  total: 170,
  per_page: 15,
  current_page: 1,
  last_page: 12,
  next_page_url: 2,
  prev_page_url: null,
  from: 1,
  to: 15,
  data: [
    {
      id: 2,
      plot: "The Force is strong with you. A powerful Sith you will become. Henceforth, you shall be known as Darth… Vader.",
      upvotes: 729,
      writer: " Darth Sidious"
    },
    {
      id: 3,
      plot: "Mmm. Lost a planet, Master Obi-Wan has. How embarrassing.",
      upvotes: 800,
      writer: "Yoda"
    },
    ...
  ]
}
```