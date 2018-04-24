
const ipfsBootstrapNodesList = [
  '/dns4/ipfs.decenter.com/tcp/4443/wss/ipfs/QmWv5BiGHbZNQKg48cA1FLJaiM7aBj4NNDc1HmBkxbxhLz',
];

const defaultRepNodes = [
  'https://ipfs.decenter.com',
];

let ipfsNode;

try {
  ipfsNode = new Ipfs({ //eslint-disable-line
    repo: 'ipfs-cryptage',
    config: {
      Bootstrap: ipfsBootstrapNodesList,
      Swarm: [],
    },
  });
} catch (e) {
  console.error(e);
}

const replicate = (hash, type) => {
  let successful = 0;
  const replicationNodes = [
    ...defaultRepNodes,
  ];
  const replicationPromises = replicationNodes.map(node =>
    new Promise((resolve) => {
      const url = `${node}${type === 'file' ?
        '/api/v0/get?arg=' : '/api/v0/object/get?arg='}${hash}`;
      return fetch(url, { method: 'head', mode: 'no-cors' })
        .then(() => {
          successful += 1;
          resolve();
        })
        .catch((error) => {
          console.log(error);
          resolve();
        });
    }));
  Promise.all(replicationPromises)
    .then(() => console.log(`Successfully replicated ${type} with hash: ${hash} on ${successful}/${replicationNodes.length} nodes`)); //eslint-disable-line
};

const uploadData = data =>
  new Promise((resolve, reject) => {
    const preparedData = Buffer.from(JSON.stringify(data));

    return ipfsNode.files.add(preparedData)
      .then((res) => {
        replicate(res[0].hash, 'file');
        resolve(res);
      })
      .catch(err => reject(err));
  });

const getFile = hash => ipfsNode.files.get(hash);

const getFileStream = hash => ipfsNode.files.cat(hash);

const uploadToIpfs = data =>
  new Promise((resolve, reject) => {
    uploadData(data)
      .then((ipfsHash) => {
        resolve(ipfsHash);
      })
      .catch(err => reject(err));
  });


export default {
  uploadData,
  getFile,
  getFileStream,
  replicate,
  uploadToIpfs,
};
