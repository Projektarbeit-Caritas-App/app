interface Image {
    name: string;
    image: any;
}

const icons: Array<Image> = [
    {
        name: 'fa-dress',
        image: require('../assets/icons/dress.png'),
    },
    {
        name: 'fa-pants',
        image: require('../assets/icons/trousers.png'),
    },
    {
        name: 'fa-toys',
        image: require('../assets/icons/toy.png'),
    }
];

export const getIcon = (name: string) => {
    const found = icons.find(e => e.name === name);
    return found ? found.image : null;
};
