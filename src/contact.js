function loadContactContent() {
    const contactContainer = document.createElement('div');
    contactContainer.id = 'contact';

    const img = new Image();
    img.src = 'https://images.pexels.com/photos/143640/pexels-photo-143640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    const infoContainer = document.createElement('div');

    const info = document.createElement('p');
    info.textContent = 'Feel free to call or email us with any of your inquiries regarding allergies, bookings, or anything else about tea!';

    const email = document.createElement('p');
    email.textContent = 'Email: definitely_a_real_email@yahoo.net';

    const phoneNumber = document.createElement('p');
    phoneNumber.textContent = 'Phone number: 01-23456789';

    infoContainer.append(info, email, phoneNumber);
    contactContainer.append(img, infoContainer);

    return contactContainer;
}

export default loadContactContent;
