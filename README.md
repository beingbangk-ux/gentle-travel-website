# Gentle Travel Website

เว็บไซต์ Static ภาษาไทยเวอร์ชันล่าสุด ปรับ Trust Bar, Corporate Section และ Visa Destination Cards พร้อมใช้งานกับ GitHub และ Cloudflare Pages

## วิธีอัปโหลด

1. แตกไฟล์ ZIP
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดภายใน `gentle-travel-website` ไปยัง Repository
3. ใน Cloudflare Pages เลือก Repository นี้
4. Framework preset เลือก `None` และไม่ต้องใส่ Build command
5. Build output directory ใช้ `/` หรือเว้นว่างตามหน้าจอที่ Cloudflare แสดง

## แก้ไขช่องทาง LINE ในอนาคต

QR LINE อยู่ที่ `assets/line-qr.jpg` ปุ่มบนเว็บไซต์จะเลื่อนไปยัง QR โดยตรง หากมีลิงก์ LINE แบบเปิดแชต สามารถเปลี่ยน `href="#line-qr"` ใน `index.html` เป็นลิงก์นั้นได้

ภาพถ่ายประกอบ: Unsplash (`photo-1679848656293-edea332ef8cc`, `photo-1683210613322-4ae523a69eb3`, `photo-1733021194512-b8f0f8f164f1`, `photo-1741615062337-ca3deb8cc4fd`)

ไฟล์ธง: Flagcdn (`us.svg`, `ca.svg`, `eu.svg`)
