document.addEventListener("DOMContentLoaded", () => {
  //--- Content Object ---

  /*
        This `folderContent` keeps things organized. Instead of writing all my image information
        directly in the HTML file, I'm keeping it all here in one place. 

        This makes it really easy to update if I wanted to add new content in the future (which i most likely will)
        wihtout touching html. I can also easily scale it, simply by adding a new folder section in html and doing the same in the script.
        It is also extremely readible making editing easy.
    */
  const folderContent = {
    graphics: {
      title: "Graphic Design",
      images: [
        {
          src: "graphic/graphic1.jpeg",
          label: "graphic1.png",
          credit: "https://www.cosmos.so/e/1295313697",
        },
        {
          src: "graphic/graphic2.jpeg",
          label: "graphic2.png",
          credit: "https://www.cosmos.so/e/98618989",
        },
        {
          src: "graphic/graphic3.jpeg",
          label: "graphic3.png",
          credit: "https://www.cosmos.so/e/1242978749",
        },
        {
          src: "graphic/graphic4.jpeg",
          label: "graphic4.png",
          credit: "https://www.cosmos.so/e/1242396012",
        },
        {
          src: "graphic/graphic5.jpeg",
          label: "graphic5.png",
          credit: "https://www.cosmos.so/e/762274323",
        },
        {
          src: "graphic/graphic6.jpeg",
          label: "graphic6.png",
          credit: "https://www.cosmos.so/e/534804327",
        },
      ],
    },
    photography: {
      title: "Photography",
      images: [
        {
          src: "photo/photo1.jpeg",
          label: "photo1.jpg",
          credit: "https://www.cosmos.so/e/103257334",
        },
        {
          src: "photo/photo2.jpeg",
          label: "photo2.jpg",
          credit: "https://www.cosmos.so/e/470261927",
        },
        {
          src: "photo/photo3.jpeg",
          label: "photo3.jpg",
          credit: "https://www.cosmos.so/e/784334768",
        },
        {
          src: "photo/photo4.jpeg",
          label: "photo4.jpg",
          credit: "https://www.cosmos.so/e/829378319",
        },
        {
          src: "photo/photo5.jpeg",
          label: "photo5.jpg",
          credit: "https://www.cosmos.so/e/1681000303",
        },
        {
          src: "photo/photo6.jpeg",
          label: "photo6.jpg",
          credit: "https://www.cosmos.so/e/1358826435",
        },
      ],
    },
    "3d": {
      title: "3D Renders",
      images: [
        {
          src: "3D/render1.jpeg",
          label: "render1.jpg",
          credit: "https://www.cosmos.so/e/1852060212",
        },
        {
          src: "3D/render2.gif",
          label: "render2.gif",
          credit: "https://www.cosmos.so/e/1368800789",
        },
        {
          src: "3D/render3.jpeg",
          label: "render3.jpg",
          credit: "https://www.cosmos.so/e/1504592601 ",
        },
        {
          src: "3D/render4.jpeg",
          label: "render4.jpg",
          credit: "https://www.cosmos.so/e/562066498",
        },
        {
          src: "3D/render5.jpeg",
          label: "render5.jpg",
          credit: "https://www.cosmos.so/e/1646591941",
        },
        {
          src: "3D/render6.gif",
          label: "render6.gif",
          credit: "https://www.cosmos.so/e/72097321",
        },
      ],
    },
  };

  // --- Using HTML Elements I'll Need to Work With ---
  /*
        Here, I'm finding the important elements from my html file and
        storing them in constant variables. */
  const desktop = document.getElementById("desktop");
  const folderIcons = document.querySelectorAll(".folder-icon");
  const openSound = document.getElementById("open-sound");
  const closeSound = document.getElementById("close-sound");

  // --- Making the Folder Icons Clickable ---

  /* Since `folderIcons` is a list of all my icons, I'm using `forEach` to loop
        through each one. For every single icon in the list, I'm attaching an
        `addEventListener`.*/
  folderIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // Inside the click function, I first need to figure out which folder was clicked.
      // I do this by reading the `data-folder-id` I set in my HTML
      const folderId = icon.dataset.folderId;
      const content = folderContent[folderId];
      if (content) {
        openSound.currentTime = 0;
        openSound.play();
        createFolderWindow(content);
      }
    });
  });

  // --- Making Folder Window ---
  function createFolderWindow(content) {
    const windowEl = document.createElement("div");
    windowEl.className = "window folder-window";
    // This gives them a random starting position so they open up in different spots
    const xPos = 100 + Math.random() * 200;
    const yPos = 50 + Math.random() * 100;
    windowEl.style.left = `${xPos}px`;
    windowEl.style.top = `${yPos}px`;
    const imageGridHTML = content.images
      .map(
        (image, i) => `
            <div class="image-item" data-index="${i}">
                <img src="${image.src}" alt="${image.label}">
                <p>${image.label}</p>
            </div>
        `
      )
      .join("");

    windowEl.innerHTML = `
            <div class="title-bar">
                <span class="title-bar-text">${content.title}</span>
                <button class="close-button">X</button>
            </div>
            <div class="window-body grid-layout">
                ${imageGridHTML}
            </div>
            <div class="resize-handle"></div>
        `;

    // This makes the window appear on the page
    desktop.appendChild(windowEl);

    // This function to add the drag, resize, and close features.
    addStandardWindowFunctions(windowEl);

    // This makes the thumbnails in the windows clickable
    windowEl.querySelectorAll(".image-item").forEach((item) => {
      item.addEventListener("click", () => {
        const imageIndex = parseInt(item.dataset.index);
        const imageData = content.images[imageIndex];
        createImageViewer(imageData);
      });
    });
  }

  // ---Image Viewer Window ---

  function createImageViewer(imageData) {
    //Starts by creating a new, invisible `Image` object in JavaScript.
    const img = new Image();
    img.onload = () => {
      // --- The Sizing Logic ---
      const titleBarHeight = 30,
        creditBarHeight = 40,
        windowPadding = 20;
      const totalNonImageHeight =
        titleBarHeight + creditBarHeight + windowPadding;

      // I don't want the window to be bigger than the screen, so I'll set the max size
      const maxWindowWidth = desktop.clientWidth * 0.85;
      const maxWindowHeight = desktop.clientHeight * 0.85;

      const maxImageWidth = maxWindowWidth;
      const maxImageHeight = maxWindowHeight - totalNonImageHeight;

      // I get the image's original size.
      let imageWidth = img.naturalWidth;
      let imageHeight = img.naturalHeight;
      const aspectRatio = imageWidth / imageHeight; // Prevents stetching of the image!

      if (imageWidth > maxImageWidth) {
        imageWidth = maxImageWidth;
        imageHeight = imageWidth / aspectRatio; // Adjust height based on new width
      }
      if (imageHeight > maxImageHeight) {
        imageHeight = maxImageHeight;
        imageWidth = imageHeight * aspectRatio; // Adjust width based on new height
      }

      const finalWindowWidth = imageWidth + windowPadding;
      const finalWindowHeight = imageHeight + totalNonImageHeight;

      const viewerEl = document.createElement("div");
      viewerEl.className = "window image-viewer-window";

      // This applies calculated size directly to the window's style.
      viewerEl.style.width = `${finalWindowWidth}px`;
      viewerEl.style.height = `${finalWindowHeight}px`;

      const xPos =
        (desktop.clientWidth - finalWindowWidth) / 2 +
        (Math.random() - 0.5) * 100;
      const yPos =
        (desktop.clientHeight - finalWindowHeight) / 2 +
        (Math.random() - 0.5) * 50;
      viewerEl.style.left = `${Math.max(20, xPos)}px`;
      viewerEl.style.top = `${Math.max(20, yPos)}px`;

      openSound.currentTime = 0;
      openSound.play();

      viewerEl.innerHTML = `
                <div class="title-bar">
                    <span class="title-bar-text">${imageData.label}</span>
                    <button class="close-button">X</button>
                </div>
                <div class="window-body">
                    <div class="image-container">
                        <img src="${imageData.src}" alt="${imageData.label}">
                    </div>
                    <div class="image-credit">${imageData.credit || "N/A"}</div>
                </div>
                <div class="resize-handle"></div>
            `;
      desktop.appendChild(viewerEl);

      addStandardWindowFunctions(viewerEl);
    };

    // This begins the image download
    img.src = imageData.src;
  }

  /* Since every window I create needs to be draggable, resizable, and closeable, 
  it makes sense to put that logic in onenplace instead of writing it out twice, keeping things DRY*/
  function addStandardWindowFunctions(windowEl) {
    const titleBar = windowEl.querySelector(".title-bar");
    const closeButton = windowEl.querySelector(".close-button");
    // Function to make it draggable.
    makeDraggable(windowEl, titleBar);
    // Function to make it resizable.
    makeResizable(windowEl);
    // Close button functionality
    closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      closeSound.play();
      desktop.removeChild(windowEl); // This completely deletes the window form the page
    });
  }

  /* This function makes a window element and its title bar handle draggable*/
  function makeDraggable(elementToDrag, dragHandle) {
    let isDragging = false; // Too track if it's currently dragging.
    let offsetX, offsetY;

    // For when the mouse is clicked down
    dragHandle.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      isDragging = true;

      // This brings the clicked window to the front by finding the highest z-index amd making it one higher
      const windows = document.querySelectorAll(".window");
      let maxZ = 10;
      windows.forEach((win) => {
        const z = parseInt(win.style.zIndex) || 10;
        if (z > maxZ) maxZ = z;
      });
      elementToDrag.style.zIndex = maxZ + 1;

      // Calculates the offset here, making dragging feel smooth.
      offsetX = e.clientX - elementToDrag.offsetLeft;
      offsetY = e.clientY - elementToDrag.offsetTop;

      // Once dragging has started, this listens for mouse movements on the page
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    //This function runs every single time the mouse moves.
    function onMouseMove(e) {
      if (!isDragging) return;

      // The new position of my window is the current mouse position minus offset from before
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      // Makes sure the window can't be dragged outside the desktop area.
      const desktopRect = desktop.getBoundingClientRect();
      newX = Math.max(
        0,
        Math.min(newX, desktopRect.width - elementToDrag.offsetWidth)
      );
      newY = Math.max(
        0,
        Math.min(newY, desktopRect.height - elementToDrag.offsetHeight)
      );

      // Applies the new position to the window's style.
      elementToDrag.style.left = `${newX}px`;
      elementToDrag.style.top = `${newY}px`;
    }

    // when mouse is no longer being clicked
    function onMouseUp() {
      isDragging = false;

      // This ensures the listened isn't still active when nothing is being dragged
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }

  // --- Window Resizing ---

  /*This function is like of `makeDraggable`. It follows the exact same
        mousedown -> mousemove -> mouseup pattern, but instead it changes the `width` and `height`. */
  function makeResizable(elementToResize) {
    const resizeHandle = elementToResize.querySelector(".resize-handle");
    let isResizing = false;
    let initialX, initialY, initialWidth, initialHeight;

    resizeHandle.addEventListener("mousedown", (e) => {
      e.stopPropagation(); // This prevents the mousedown from triggering the drag functionality by accident.
      isResizing = true;

      // This records the state of things at the exact moment I start resizing.
      initialX = e.clientX;
      initialY = e.clientY;
      initialWidth = elementToResize.offsetWidth;
      initialHeight = elementToResize.offsetHeight;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    function onMouseMove(e) {
      if (!isResizing) return;

      // This calculates how far the mouse has moved from its starting point.
      const deltaX = e.clientX - initialX;
      const deltaY = e.clientY - initialY;

      // The new size is the starting size plus the distance the mouse has moved.
      let newWidth = initialWidth + deltaX;
      let newHeight = initialHeight + deltaY;

      // Gives minimum size.
      const minWidth = parseInt(getComputedStyle(elementToResize).minWidth);
      const minHeight = parseInt(getComputedStyle(elementToResize).minHeight);
      newWidth = Math.max(minWidth, newWidth);
      newHeight = Math.max(minHeight, newHeight);

      // Applies the new size to the window
      elementToResize.style.width = `${newWidth}px`;
      elementToResize.style.height = `${newHeight}px`;
    }

    function onMouseUp() {
      isResizing = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }
});
