export const getItems = (category_id, subcategories) => {
    const newArr = subcategories.filter(o => o.category_id === category_id);
    return newArr.length;
}

export const getBgColor = (len) => {
    const bgarr = []
    for (var i = 0; i < len; i++) {
        let $col = Math.floor(Math.random() * 16777215).toString(16);
        bgarr.push('#'+$col)
    }

    return bgarr;
}