import Docker from "dockerode";
const docker = new Docker();

const listContainers = async (req, res) => {
  const containers = await docker.listContainers({
    all: true,
  });
  return res.json({
    containers: containers.map((container) => ({
      id: container.Id,
      name: container.Names[0],
      image: container.Image,
      state: container.State,
      status: container.Status,
    })),
  });
};

const createContainer = async (req, res) => {
  const { image } = req.body;

  let pullStream = await docker.pull(image);
  await new Promise((resolve, reject) => {
    docker.modem.followProgress(pullStream, (err, res) =>
      err ? reject(err) : resolve(res)
    );
  });

  const newContainer = await docker.createContainer({
    Image: image,
    Cmd: ["sh"],
    AttachStdout: true, // so that the container keeps running
    Tty: true,
    HostConfig: {
      PortBindings: {
        "80/tcp": [
          {
            HostPort: "9000",
          },
        ],
      },
    },
  });

  await newContainer.start();
  return res.json({
    containerId: newContainer.id,
  });
};

export { createContainer, listContainers };
