# Gentle Travel Website

เว็บไซต์ Static ภาษาไทย เวอร์ชัน 2 ปรับตาม mockup ที่อนุมัติ พร้อมใช้งานกับ GitHub และ Cloudflare Pages

## วิธีอัปโหลด

1. แตกไฟล์ ZIP
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดภายใน `gentle-travel-website` ไปยัง Repository
3. ใน Cloudflare Pages เลือก Repository นี้
4. Framework preset เลือก `None` และไม่ต้องใส่ Build command
5. Build output directory ใช้ `/` หรือเว้นว่างตามหน้าจอที่ Cloudflare แสดง

## แก้ไขช่องทาง LINE ในอนาคต

QR LINE อยู่ที่ `assets/line-qr.jpg` ปุ่มบนเว็บไซต์จะเลื่อนไปยัง QR โดยตรง หากมีลิงก์ LINE แบบเปิดแชต สามารถเปลี่ยน `href="#line-qr"` ใน `index.html` เป็นลิงก์นั้นได้

ภาพสนามบิน: Unsplash / Lim Wu (`photo-1679848656293-edea332ef8cc`)
