# fourth-lesson-streams
## 🚀 Getting Started

Start the server and open the page in your browser — you should see the contents of `index.html`.

---

## 📌 Endpoints

The application includes three server endpoints that need to be implemented:

### 1. 📤 Upload (File Upload)

- Implement an endpoint for uploading `.txt` files  
- Uploaded files should be saved in the `public/uploads` directory  

---

### 2. 📥 Download (File Download)

- If a filename is provided, the server should find it in the `public` directory and send it to the user for download  
- If no filename is provided, the server should send a default file — `sample-2mb.txt`  

---

### 3. 📦 Download with Compression

- Similar to the previous endpoint  
- The file should be sent in a compressed format (`gzip`)  