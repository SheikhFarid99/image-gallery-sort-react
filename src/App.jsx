import React, { useState } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";
import "./App.css";

function App() {
  const [items, setItems] = React.useState({
    left: [
      { id: 1, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1685096216/products/vlwxfyo0bgxj1drl31wr.webp' },
      { id: 2, image: "https://res.cloudinary.com/dpj4vsqbo/image/upload/v1685095287/products/uahwzjvqvlomz7anrpyj.webp" },
      { id: 3, image: "https://res.cloudinary.com/dpj4vsqbo/image/upload/v1685095283/products/d6ooeedzin5bnuo7cmtw.webp" },
      { id: 4, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1685019934/products/nczv6zjrnzfgcvyozif1.webp' },
      { id: 5, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1685019932/products/eed9btpruwqquqjvskbe.webp' },
      { id: 6, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1684936745/categorys/alstgo4ko214phaele2e.webp' },
      { id: 7, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1690701998/categorys/l7eukgxnu9m6lpprukru.jpg' },
      { id: 8, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1694475126/products/iamvoge3h6boplx5nq0s.jpg' },
      { id: 9, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1694475128/products/bdbd7rowzpdosd9ecfdw.jpg' },
      { id: 10, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1694475125/products/m2emapvkowpwzrjj80bc.jpg' },
      { id: 11, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1645339379/samples/food/pot-mussels.jpg' },
      { id: 12, image: 'https://res.cloudinary.com/dpj4vsqbo/image/upload/v1645339378/samples/food/fish-vegetables.jpg' },

    ],
  });

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1]
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result
    });
  }

  const [selectItems, setSelectItems] = useState([])

  const select = (e, item) => {
    if (e.target.checked) {
      setSelectItems([...selectItems, item])
    } else {
      const temp = selectItems.filter(i => i.id !== item.id)
      setSelectItems(temp)
    }
  }
  const delete_items = () => {
    const temp_data = items.left.filter(item1 =>
      !selectItems.some(item2 => item2.id === item1.id)
    );
    setItems({
      ...items,
      left: temp_data
    })
    setSelectItems([])
  }
  return (
    <div className="content">
      <div className="content_center">
        <div className="delete_section">

          {
            selectItems.length > 0 ? < div className="flex justify-between items-center">
              <div className="flex gap-10">
                <input onChange={() => setSelectItems([])} checked={selectItems.length > 0} type="checkbox" />
                <span>{selectItems.length} Items select</span>
              </div>
              <span onClick={delete_items}>delete</span>
            </div> : <h2>Image gallery</h2>
          }
        </div>
        <GridContextProvider onChange={onChange}>
          <div className="image_content">
            <GridDropZone style={{
              height: `${Math.ceil(items.left.length / 4) * 160}px`
            }}
              className="dropzone left"
              id="left"
              boxesPerRow={4}
              rowHeight={160}
            >
              {items.left.map(item => (
                <GridItem key={item.id}>
                  <div className="grid-item">
                    <div style={{
                      backgroundImage: `url(${item.image})`,
                      marginRight: '2px'
                    }} className="grid-item-content">
                      <div className={`item ${selectItems.some(s => s.id === item.id) ? 'show_shadow' : ''}`}></div>
                    </div>
                    <input checked={selectItems.some(s => s.id === item.id)} className={selectItems.some(s => s.id === item.id) ? 'show input checkbox' : 'checkbox input'} onChange={(e) => select(e, item)} id={item.id} type="checkbox" />
                  </div>
                </GridItem>
              ))}
            </GridDropZone>
          </div>
        </GridContextProvider>
      </div>
    </div >
  );
}
export default App


