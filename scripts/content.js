function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function getImgFromUrl(logo_url, callback) {
    var img = new Image();
    img.src = logo_url;
    img.onload = function () {
        toDataURL(logo_url, function(imageBase64) {
            callback(imageBase64);
        })
    };
} 

createPdf = async (imgArr) => {
    // Create and append a link
    let link = document.createElement("a");
    document.documentElement.append(link);

    const newPDF = new jsPDF("p", "mm", "a4");
    const width = newPDF.internal.pageSize.width;
    const height = newPDF.internal.pageSize.height;

    var base64 = new Array(imgArr.length); // base64 images held here
    var done = 0

    imgArr.forEach(function(image, index) {
        var updatedImage = image.replace('PageThumb', 'Page'); // Increase pic quality

        getImgFromUrl(updatedImage, function(base64Img) {
            base64[index] = base64Img;
            done++;
            if (done == imgArr.length) {
                base64.forEach(function(img64, indx) {
                    if (indx !== 0) {
                        newPDF.addPage();
                    }
                    // This puts the URL of the active element at the top of the document
                    newPDF.addImage(img64, 'JPEG', 0, 0, width, height);
                })
                newPDF.save('demo.pdf');
                console.log('Document served!');
            }
        });
    });
};

// Open modal
gridViewBtn = document.getElementById('grid-view')
if(gridViewBtn) {
    gridViewBtn.click()
    setTimeout(function() {
        // Get all the pages URLs
        pages = document.getElementsByClassName('pages-card-img')
        links = []
        for (let index = 0; index < pages.length; index++) {
            links.push(pages[index].src);
        }
        
        // Start building pdf
        createPdf(links)

    }, 1000);
}


