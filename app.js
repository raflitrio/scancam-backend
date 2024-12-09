import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import { db } from "./src/config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", authRoutes);

// Routes untuk skincare
app.get("/", (req, res) => {
  res.send("Selamat datang di API Manajemen Pengguna");
});

// Routes untuk sabun cuci muka
// 1. Mengambil semua sabun cuci muka
app.get('/sabun_cuci_muka', (req, res) => {
  const query = 'SELECT * FROM sabun_cuci_muka'; // Query untuk mengambil semua data sabun cuci muka

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data sabun cuci muka:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results);
    }
  });
});
app.get('/sabun_cuci_muka/:id', (req, res) => {
  const id = req.params.id; // Ambil 'id' dari parameter URL
  const query = 'SELECT * FROM sabun_cuci_muka WHERE id = ?'; // Query untuk mengambil data sabun cuci muka berdasarkan id

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error saat mengambil data sabun cuci muka berdasarkan id:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else if (results.length === 0) {
      res.status(404).send('Sabun cuci muka tidak ditemukan.');
    } else {
      res.json(results[0]); // Kirim data sabun cuci muka yang ditemukan
    }
  });
});

app.get('/sabun_cuci_muka/kategori/:kategori', (req, res) => {
  const kategori = req.params.kategori;
  const query = 'SELECT * FROM sabun_cuci_muka WHERE kategori = ?'; // Query untuk mengambil sabun cuci muka berdasarkan kategori

  db.query(query, [kategori], (err, results) => {
    if (err) {
      console.error('Error saat mengambil data sabun cuci muka:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); // Mengirimkan hasil query dalam format JSON
    }
  });
});


// SUNSCREEN
app.get('/sunscreen', (req, res) => {
  const query = 'SELECT * FROM sunscreen'; // Query untuk mengambil semua data sunscreen

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results);
    }
  });
});
app.get('/sunscreen/id/:id', (req, res) => {
  const id = req.params.id; // Ambil 'id' dari parameter URL
  const query = 'SELECT * FROM sunscreen WHERE id = ?'; // Query untuk mengambil data sunscreen berdasarkan id

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error saat mengambil data sunscreen berdasarkan id:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else if (results.length === 0) {
      res.status(404).send('Sunscreen tidak ditemukan.');
    } else {
      res.json(results[0]); // Kirim data sunscreen yang ditemukan
    }
  });
});
app.get('/sunscreen/kategori/:kategori', (req, res) => {
  const kategori = req.params.kategori;
  const query = 'SELECT * FROM sunscreen WHERE kategori = ?'; // Query untuk mengambil sunscreen berdasarkan kategori

  db.query(query, [kategori], (err, results) => {
    if (err) {
      console.error('Error saat mengambil data sunscreen:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else if (results.length === 0) {
      res.status(400).send('Sunscreen tidak ditemukan');
    } else{
      res.json(results); // Mengirimkan hasil query dalam format JSON
    }
  });
});

/// Endpoint untuk mengambil semua data serum
app.get('/serum', (req, res) => {
  const query = 'SELECT * FROM serum'; // Query untuk mengambil semua data serum

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); // Kirim hasil query sebagai respon JSON
    }
  });
});

// Endpoint untuk mengambil data serum berdasarkan ID
app.get('/serum/:id', (req, res) => {
  const id = req.params.id; // Ambil 'id' dari parameter URL
  const query = 'SELECT * FROM serum WHERE id = ?'; // Query parameter untuk mencegah SQL injection

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); // Kirim hasil query sebagai respon JSON
    }
  });
});

// Endpoint untuk mengambil data serum berdasarkan kategori
app.get('/serum/kategori/:kategori', (req, res) => {
  const kategori = req.params.kategori; // Ambil kategori dari parameter URL
  const query = 'SELECT * FROM serum WHERE kategori = ?'; // Query untuk mencari serum berdasarkan kategori

  db.query(query, [kategori], (err, results) => {
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); // Kirim hasil query sebagai respon JSON
    }
  });
});



// TONER
app.get('/toner', (req, res) => {
  const query = 'SELECT * FROM toner'; // Query untuk mengambil semua data toner

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results);
    }
  });
});

app.get('/toner/:id', (req, res) => {
  const id = req.params.id; // Ambil 'id' dari parameter URL
  const query = 'SELECT * FROM toner WHERE id = ?'; // Query parameter untuk mencegah SQL injection

  db.query(query, [id], (err, results) => { // Menggunakan 'id' pada query
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); // Kirim hasil query sebagai respon JSON
    }
  });
});

app.put('/toner', (req, res) => {
  const { nama, image , detail,  kategori } = req.body;
  const query = 'INSERT INTO toner (nama, image , detail,  kategori) VALUES (?, ?, ?, ?)';

  db.query(query, [nama, image , detail,  kategori], (err, results) => {
    if (err) {
      console.error('Error saat menambahkan data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.status(201).json({ message: 'Toner berhasil ditambahkan', id: results.insertId });
    }
  });
});

app.put('/toner/:id', (req, res) => {
  const { id } = req.params;
  const { nama, image, detail, kategori } = req.body;
  const query = 'UPDATE toner SET nama = ?, image = ?, detail = ?, kategori = ? WHERE id = ?';

  db.query(query, [nama, image, detail, kategori, id], (err, results) => {
    if (err) {
      console.error('Error saat memperbarui data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Toner tidak ditemukan.');
    } else {
      res.json({ message: 'Toner berhasil diperbarui' });
    }
  });
});

// TONER KATEGORI
app.get('/toner/kategori/:kategori', (req, res) => {
  const kategori = req.params.kategori;
  const query = 'SELECT * FROM toner WHERE kategori = ?'; // Query untuk mengambil toner berdasarkan kategori

  db.query(query, [kategori], (err, results) => {
    if (err) {
      console.error('Error saat mengambil data toner:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); // Mengirimkan hasil query dalam format JSON
    }
  });
});

// PELEMBAB
app.get('/pelembab', (req, res) => {
  const query = 'SELECT * FROM pelembab'; 

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results);
    }
  });
});
app.get('/pelembab/:id', (req, res) => {
  const id = req.params.id; // Ambil 'id' dari parameter URL
  const query = 'SELECT * FROM pelembab WHERE id = ?'; // Query parameter untuk mencegah SQL injection

  db.query(query, [id], (err, results) => { // Menggunakan 'id' pada query
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); // Kirim hasil query sebagai respon JSON
    }
  });
});


app.get('/pelembab/kategori/:kategori', (req, res) => {
  const kategori = req.params.kategori; 
  const query = 'SELECT * FROM pelembab WHERE kategori = ?';

  db.query(query, [kategori], (err, results) => {
    if (err) {
      console.error('Error saat mengambil data:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); 
    }
  });
});

// Routes untuk Avatar

// 1. Mendapatkan semua avatar
app.get('/avatar', (req, res) => {
  const query = 'SELECT * FROM avatar'; // Query untuk mengambil semua data avatar

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data avatar:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.json(results); // Mengirim daftar avatar sebagai respon JSON
    }
  });
});

// 2. Mendapatkan avatar berdasarkan id
app.get('/avatar/:id', (req, res) => {
  const id = req.params.id; // Ambil 'id' dari parameter URL
  const query = 'SELECT * FROM avatar WHERE id = ?'; // Query untuk mengambil data avatar berdasarkan id

  db.query(query, [id], (err, results) => { 
    if (err) {
      console.error('Error saat mengambil data avatar:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else if (results.length === 0) {
      res.status(404).send('Avatar tidak ditemukan.');
    } else {
      res.json(results[0]); // Kirim avatar yang ditemukan sebagai respon JSON
    }
  });
});

// 3. Menambahkan avatar baru
app.post('/avatar', (req, res) => {
  const { image } = req.body; // Ambil field 'image' dari body permintaan
  const query = 'INSERT INTO avatar (image) VALUES (?)'; 

  db.query(query, [image], (err, results) => {
    if (err) {
      console.error('Error saat menambahkan avatar:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else {
      res.status(201).json({ message: 'Avatar berhasil ditambahkan', id: results.insertId });
    }
  });
});

// 4. Memperbarui avatar berdasarkan id
app.put('/avatar/:id', (req, res) => {
  const id = req.params.id; // Ambil 'id' dari parameter URL
  const { image } = req.body; // Ambil 'image' yang diperbarui dari body permintaan
  const query = 'UPDATE avatar SET image = ? WHERE id = ?';

  db.query(query, [image, id], (err, results) => {
    if (err) {
      console.error('Error saat memperbarui avatar:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Avatar tidak ditemukan.');
    } else {
      res.json({ message: 'Avatar berhasil diperbarui' });
    }
  });
});

// 5. Menghapus avatar berdasarkan id
app.delete('/avatar/:id', (req, res) => {
  const id = req.params.id; // Ambil 'id' dari parameter URL
  const query = 'DELETE FROM avatar WHERE id = ?'; 

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error saat menghapus avatar:', err.message);
      res.status(500).send('Terjadi kesalahan pada server.');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Avatar tidak ditemukan.');
    } else {
      res.json({ message: 'Avatar berhasil dihapus' });
    }
  });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Terjadi kesalahan!" });
});

// Tentukan port dan listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan pada http://0.0.0.0:${PORT}`);
});
