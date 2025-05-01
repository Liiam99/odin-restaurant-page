function loadMenuContent() {
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu';

    const menuItems = {
        'Ginger with lemongrass': 'https://plus.unsplash.com/premium_photo-1673507375644-55520bbeaaf7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Hibiscus': 'https://images.pexels.com/photos/31012762/pexels-photo-31012762/free-photo-of-vibrant-hibiscus-tea-pouring-over-ice-cubes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Earl grey': 'https://plus.unsplash.com/premium_photo-1663853293768-11ae559bc4e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Mint': 'https://images.unsplash.com/photo-1591299089616-c9604047b1a6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Jasmine': 'https://images.unsplash.com/photo-1609016617751-e80552ae6ec2?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Matcha': 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Green': 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Mysteary': 'https://images.pexels.com/photos/5428828/pexels-photo-5428828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    }

    for (const item in menuItems) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        const img = new Image();
        img.src = menuItems[item];

        const itemTitle = document.createElement('h2');
        itemTitle.innerText = item;

        menuItem.append(img, itemTitle);
        menuContainer.appendChild(menuItem);
    }

    return menuContainer;
}

export default loadMenuContent;
