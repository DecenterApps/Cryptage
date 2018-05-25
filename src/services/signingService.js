const sign = async (_moves, _name, _address) => {
  const url = 'https://cards.decenter.com/save';
  const res = await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      moves: _moves,
      name: _name,
      address: _address,
    }),
  });
  return res.json();
};

export default {
  sign,
};
