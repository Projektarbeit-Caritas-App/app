interface Image {
    name: string;
    image: any;
}

const icons: Array<Image> = [
    {
        name: 'babyset',
        image: require('../assets/icons/babyset.png'),
    },
    {
        name: 'ballerinas',
        image: require('../assets/icons/ballerinas.png'),
    },
    {
        name: 'bathingshoes',
        image: require('../assets/icons/bathingshoes.png'),
    },
    {
        name: 'beddingset',
        image: require('../assets/icons/beddingset.png'),
    },
    {
        name: 'bedsheets',
        image: require('../assets/icons/bedsheets.png'),
    },
    {
        name: 'belt',
        image: require('../assets/icons/belt.png'),
    },
    {
        name: 'bigtablecloth',
        image: require('../assets/icons/bigtablecloth.png'),
    },
    {
        name: 'bigtowel',
        image: require('../assets/icons/bigtowel.png'),
    },
    {
        name: 'blanket',
        image: require('../assets/icons/blanket.png'),
    },
    {
        name: 'blazer',
        image: require('../assets/icons/blazer.png'),
    },
    {
        name: 'body',
        image: require('../assets/icons/body.png'),
    },
    {
        name: 'boots',
        image: require('../assets/icons/boots.png'),
    },
    {
        name: 'bra',
        image: require('../assets/icons/bra.png'),
    },
    {
        name: 'cap',
        image: require('../assets/icons/cap.png'),
    },
    {
        name: 'cardigan',
        image: require('../assets/icons/cardigan.png'),
    },
    {
        name: 'curtain',
        image: require('../assets/icons/curtain.png'),
    },
    {
        name: 'dishcloth',
        image: require('../assets/icons/dishcloth.png'),
    },
    {
        name: 'flipflop',
        image: require('../assets/icons/flipflop.png'),
    },
    {
        name: 'glove',
        image: require('../assets/icons/glove.png'),
    },
    {
        name: 'hat',
        image: require('../assets/icons/hat.png'),
    },
    {
        name: 'headband',
        image: require('../assets/icons/headband.png'),
    },
    {
        name: 'hemd',
        image: require('../assets/icons/hemd.png'),
    },
    {
        name: 'houseshoes',
        image: require('../assets/icons/houseshoes.png'),
    },
    {
        name: 'leggins',
        image: require('../assets/icons/leggins.png'),
    },
    {
        name: 'longcoat',
        image: require('../assets/icons/longcoat.png'),
    },
    {
        name: 'shortcoat',
        image: require('../assets/icons/longcoat.png'),
    },
    {
        name: 'longpants',
        image: require('../assets/icons/longpants.png'),
    },
    {
        name: 'longshirt',
        image: require('../assets/icons/longshirt.png'),
    },
    {
        name: 'longsportpants',
        image: require('../assets/icons/longsportpants.png'),
    },
    {
        name: 'longunderpants',
        image: require('../assets/icons/longunderpants.png'),
    },
    {
        name: 'lowshoes',
        image: require('../assets/icons/lowshoes.png'),
    },
    {
        name: 'moccasins',
        image: require('../assets/icons/moccasins.png'),
    },
    {
        name: 'pantyhose',
        image: require('../assets/icons/pantyhose.png'),
    },
    {
        name: 'pullover',
        image: require('../assets/icons/pullover.png'),
    },
    {
        name: 'purse',
        image: require('../assets/icons/purse.png'),
    },
    {
        name: 'pyjamas',
        image: require('../assets/icons/pyjamas.png'),
    },
    {
        name: 'rubberboots',
        image: require('../assets/icons/rubberboots.png'),
    },
    {
        name: 'sandals',
        image: require('../assets/icons/sandals.png'),
    },
    {
        name: 'scarf',
        image: require('../assets/icons/scarf.png'),
    },
    {
        name: 'shortpants',
        image: require('../assets/icons/shortpants.png'),
    },
    {
        name: 'shortshirt',
        image: require('../assets/icons/shortshirt.png'),
    },
    {
        name: 'shortsportpants',
        image: require('../assets/icons/shortsportpants.png'),
    },
    {
        name: 'shortunderpants',
        image: require('../assets/icons/shortunderpants.png'),
    },
    {
        name: 'smallboots',
        image: require('../assets/icons/smallboots.png'),
    },
    {
        name: 'smalltablecloth',
        image: require('../assets/icons/smalltablecloth.png'),
    },
    {
        name: 'smalltowel',
        image: require('../assets/icons/smalltowel.png'),
    },
    {
        name: 'socks',
        image: require('../assets/icons/socks.png'),
    },
    {
        name: 'sportshirt',
        image: require('../assets/icons/sportshirt.png'),
    },
    {
        name: 'sportsshoes',
        image: require('../assets/icons/sportsshoes.png'),
    },
    {
        name: 'suit',
        image: require('../assets/icons/suit.png'),
    },
    {
        name: 'suitcase',
        image: require('../assets/icons/suitcase.png'),
    },
    {
        name: 'summerjacket',
        image: require('../assets/icons/summerjacket.png'),
    },
    {
        name: 'swimwear',
        image: require('../assets/icons/swimwear.png'),
    },
    {
        name: 'tie',
        image: require('../assets/icons/tie.png'),
    },
    {
        name: 'top',
        image: require('../assets/icons/top.png'),
    },
    {
        name: 'tracksuit',
        image: require('../assets/icons/tracksuit.png'),
    },
    {
        name: 'undershirt',
        image: require('../assets/icons/undershirt.png'),
    },
    {
        name: 'vest',
        image: require('../assets/icons/vest.png'),
    },
    {
        name: 'washcloth',
        image: require('../assets/icons/washcloth.png'),
    },
    {
        name: 'winterjacket',
        image: require('../assets/icons/winterjacket.png'),
    },
    {
        name: 'wintershoes',
        image: require('../assets/icons/wintershoes.png'),
    }
];

export const getIcon = (name: string) => {
    const found = icons.find(e => e.name === name);
    return found ? found.image : null;
};
