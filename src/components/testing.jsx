export default function testing() {
  return (
  <div className="format">
      <span className="first-name">Full Name</span>
      <input 
      type = "text" 
      placeholder = "First & Last Name"
      className="first-input"
      />
      <span className="first-name">Instagram</span>
      <input
      type="text"
      className="first-input"
      placeholder = "@username"
      />
      <span className="first-name">Country</span>
      <input 
      type = "text" 
      className="first-input"
      />
      <span className="first-name">City & House Number</span>
      <input 
      type = "text" 
      className="first-input"
      />
      <span className="first-name">Phone Number</span>
      <input 
      type = "text"
      placeholder="+0 000 000 0000" 
      className="first-input"
      />
      <span className="first-name">Size for Underwear</span>
      <input
      type="text"
      className="first-input"
      placeholder = "S / M / L / XL"
      />
      <span className="first-name">E-Mail</span>
      <input
      type="email"
      className="first-input"
      placeholder = "your@gmail.com"
      />

      <button className="apply">Apply Now</button>
      
  </div>
  )
}