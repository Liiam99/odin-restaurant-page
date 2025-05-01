function loadHomeContent() {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const title = document.createElement('h1');
    title.textContent = 'The Tea Tent';

    const firstSubtitle = document.createElement('p');
    firstSubtitle.textContent = 'The best place in Wageningen to enjoy fine aromatic beverages, hang out with your loved ones, and feel warmed by a cozy atmosphere';

    const secondSubtitle = document.createElement('p');
    secondSubtitle.textContent = 'Be sure to check our menu to find out if we have your favourite tea!'

    homeContainer.append(title, firstSubtitle, secondSubtitle);

    return homeContainer;
}

export default loadHomeContent;
