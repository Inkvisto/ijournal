export const postBaseRender = (firstImage:any) => {
    if (firstImage !== undefined) {
        switch (firstImage.type) {
            case "image":
                return <ImagePost data={firstImage.data} />
                break;
           
        }
    }
    else {
        null
    }
}