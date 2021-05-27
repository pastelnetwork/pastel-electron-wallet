const conversations = {
  list: () =>
    new Promise(res =>
      res({
        status: 200,
        data: [],
      }),
    ),
}

export default conversations
