import Blog from './blog';

window.onload = async () => {
  const container = document.getElementById('container');

  // eslint-disable-next-line no-unused-vars
  const blogTool = new Blog(container);
};
