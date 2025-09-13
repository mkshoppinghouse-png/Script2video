
document.getElementById('generate').onclick = async ()=>{
  const script = document.getElementById('script').value.split('\n').filter(Boolean);
  if(!script.length){alert('স্ক্রিপ্ট লিখুন'); return;}
  document.getElementById('status').innerText='Video generating...';
  try{
    const res = await fetch('/generate',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({lines: script.map(t=>({text:t,lang:'bn'}))})
    });
    const data = await res.json();
    if(data.success){
      document.getElementById('status').innerHTML=`✅ Video ready: <a href="${data.videoUrl}" target="_blank">Download</a>`;
    } else {
      document.getElementById('status').innerText='Error: '+data.error;
    }
  }catch(err){document.getElementById('status').innerText='Error: '+err.message;}
}
