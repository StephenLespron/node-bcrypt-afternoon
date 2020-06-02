module.exports = {
  dragonTreasure: async (req, res, next) => {
    const db = req.app.get("db");

    const result = await db.get_dragon_treasure(1);

    return res.status(200).send(result);
  },
  getUserTreasure: async (req, res, next) => {
    const userTreasure = await req.app
      .get("db")
      .get_user_treasure([req.session.user.id]);

    return res.status(200).send(userTreasure);
  },

  addUserTreasure: async (req, res, next) => {
    const { treasureURL } = req.body,
      { id } = req.session.user;

    const userTreasure = await req.app
      .get("db")
      .add_user_treasure([treasureURL, id]);

    res.status(200).send(userTreasure);
  },

  getAllTreasure: async (req, res, next) => {
    const allTreasure = await req.app.get("db").get_all_treasure();

    res.status(200).send(allTreasure);
  },
};
