function getRowContent(row, label) {
  const cells = [...row.children];
  const rowLabel = cells[0]?.textContent.trim().toLowerCase();
  return rowLabel === label ? cells[1] : null;
}

export default function decorate(block) {
  const rows = [...block.children];
  const imageCell = rows.map((row) => getRowContent(row, 'image')).find(Boolean);
  const titleCell = rows.map((row) => getRowContent(row, 'title')).find(Boolean);
  const descriptionCell = rows.map((row) => getRowContent(row, 'description')).find(Boolean);
  const ctaCell = rows.map((row) => getRowContent(row, 'cta')).find(Boolean);

  const content = document.createElement('div');
  content.className = 'banner-content';

  if (titleCell) {
    const title = document.createElement('h2');
    title.textContent = titleCell.textContent.trim();
    content.append(title);
  }

  if (descriptionCell) {
    const description = document.createElement('p');
    description.textContent = descriptionCell.textContent.trim();
    content.append(description);
  }

  if (ctaCell?.querySelector('a')) {
    const cta = ctaCell.querySelector('a').cloneNode(true);
    cta.className = 'button';
    content.append(cta);
  }

  if (imageCell?.querySelector('img')) {
    const image = imageCell.querySelector('img').cloneNode(true);
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'banner-image';
    imageWrapper.append(image);
    block.replaceChildren(imageWrapper, content);
  } else {
    block.replaceChildren(content);
  }
}
