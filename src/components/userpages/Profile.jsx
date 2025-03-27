import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Full list of U.S. states
const statesList = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", 
  "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", 
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", 
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", 
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", 
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// Example list of cities for each state
const citiesList = {
  "Alabama": ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"],
  "Alaska": ["Anchorage", "Juneau", "Fairbanks", "Sitka", "Ketchikan"],
  "Arizona": ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
  "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville", "Jonesboro", "North Little Rock"],
  "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
  "Colorado": ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
  "Connecticut": ["Hartford", "New Haven", "Stamford", "Bridgeport", "Norwalk"],
  "Delaware": ["Wilmington", "Dover", "Newark", "Middletown", "Georgetown"],
  "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg"],
  "Georgia": ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah"],
  "Hawaii": ["Honolulu", "Hilo", "Kailua", "Kapolei", "Waipahu"],
  "Idaho": ["Boise", "Nampa", "Meridian", "Idaho Falls", "Pocatello"],
  "Illinois": ["Chicago", "Aurora", "Naperville", "Joliet", "Springfield"],
  "Indiana": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
  "Iowa": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"],
  "Kansas": ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka"],
  "Kentucky": ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
  "Louisiana": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
  "Maine": ["Portland", "Lewiston", "Bangor", "Augusta", "Biddeford"],
  "Maryland": ["Baltimore", "Rockville", "Gaithersburg", "Bowie", "Frederick"],
  "Massachusetts": ["Boston", "Worcester","Westford","Springfield", "Cambridge", "Lowell"],
  "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"],
  "Minnesota": ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"],
  "Mississippi": ["Jackson", "Gulfport", "Biloxi", "Southaven", "Hattiesburg"],
  "Missouri": ["Kansas City", "St. Louis", "Springfield", "Columbia", "Jefferson City"],
  "Montana": ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte"],
  "Nebraska": ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
  "Nevada": ["Las Vegas", "Reno", "Henderson", "Paradise", "Carson City"],
  "New Hampshire": ["Manchester", "Nashua", "Concord", "Derry", "Rochester"],
  "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison"],
  "New Mexico": ["Albuquerque", "Santa Fe", "Las Cruces", "Rio Rancho", "Roswell"],
  "New York": ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
  "North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
  "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
  "Oklahoma": ["Oklahoma City", "Tulsa", "Norman", "Edmond", "Lawton"],
  "Oregon": ["Portland", "Salem", "Eugene", "Gresham", "Bend"],
  "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
  "Rhode Island": ["Providence", "Cranston", "Warwick", "Pawtucket", "East Providence"],
  "South Carolina": ["Charleston", "Columbia", "Greenville", "Myrtle Beach", "Spartanburg"],
  "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Mitchell"],
  "Tennessee": ["Memphis", "Nashville", "Knoxville", "Chattanooga", "Clarksville"],
  "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"],
  "Utah": ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem"],
  "Vermont": ["Burlington", "South Burlington", "Rutland", "Barre", "Montpelier"],
  "Virginia": ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News"],
  "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
  "West Virginia": ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"],
  "Wisconsin": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
  "Wyoming": ["Cheyenne", "Casper", "Laramie", "Gillette", "Jackson"]
};

function Profile() {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [promodal, setPromodal] = useState(false);
  const [proupdate, setProupdate] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: ''
  });
  const [addData, setAddData] = useState({
    address: '',
    city: '',
    state: '',
    postal_code: ''
  });
  const [editData, setEditData] = useState({
    address: '',
    city: '',
    state: '',
    postal_code: ''
  });
  const [getAddress, setGetAddress] = useState([]);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [citiesOptions, setCitiesOptions] = useState([]);

  useEffect(() => {
    getProfile();
    getAddressFun();
    getImages();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:6060/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data.message);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updProfile = await axios.put('http://localhost:6060/profileupdate', proupdate, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (updProfile.status === 200) {
        alert('Profile updated');
        setPromodal(false);
        getProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('file', file);
      const response = await axios.post('http://localhost:6060/profileImage', formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        alert('Profile image uploaded');
        getImages();
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const getImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:6060/getallimages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(response.data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const addresponse = await axios.post('http://localhost:6060/addaddress', addData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (addresponse.status === 200) {
        getAddressFun();
        setModal(false);
        alert('Address added');
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const getAddressFun = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:6060/getaddress', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGetAddress(res.data.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const editAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.put(`http://localhost:6060/updateaddress/${editData.id}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.status === 200) {
        alert('Address updated');
        getAddressFun();
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const addDelete = async (id, e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.delete(`http://localhost:6060/deletaddress/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.status === 200) {
        alert('Address deleted');
        getAddressFun();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const fileonChange = (e) => {
    setFile(e.target.files[0]);
  };

  const editProfileData = (profileData) => {
    setProupdate({
      firstname: profileData.firstname || '',
      lastname: profileData.lastname || '',
      email: profileData.email || '',
      phonenumber: profileData.phonenumber || ''
    });
    setPromodal(true);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setCitiesOptions(citiesList[state] || []);
    setAddData({ ...addData, state });
    setEditData({ ...editData, state });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Profile</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Profile Details</h5>
              <ul className="list-unstyled">
                <li><strong>Firstname:</strong> {data.firstname}</li>
                <li><strong>Lastname:</strong> {data.lastname}</li>
                <li><strong>Email:</strong> {data.email}</li>
                <li><strong>Phone number:</strong> {data.phonenumber}</li>
                <li><button className="btn btn-primary mt-2" onClick={() => editProfileData(data)}>Edit Profile</button></li>
              </ul>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Profile Images</h5>
              <div className="mb-3">
                {images.length > 0 ? (
                  images.map((image) => (
                    <img
                      key={image.id}
                      src={`http://localhost:6060/uploads/profile/${image.profileImage}`}
                      alt="Profile"
                      className="img-thumbnail"
                      style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                    />
                  ))
                ) : (
                  <p>No profile images</p>
                )}
              </div>
              {images.length === 0 ? (
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-3">
                    <input type="file" className="form-control" onChange={fileonChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Upload</button>
                </form>
              ) : (
                <button className="btn btn-secondary">Edit Images</button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Address</h5>
              <form onSubmit={addAddress}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter address"
                    name="address"
                    value={addData.address}
                    onChange={(e) => setAddData({ ...addData, address: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-control"
                    name="state"
                    value={addData.state}
                    onChange={handleStateChange}
                  >
                    <option value="">Select State</option>
                    {statesList.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    className="form-control"
                    name="city"
                    value={addData.city}
                    onChange={(e) => setAddData({ ...addData, city: e.target.value })}
                  >
                    <option value="">Select City</option>
                    {citiesOptions.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter postal code"
                    name="postal_code"
                    value={addData.postal_code}
                    onChange={(e) => setAddData({ ...addData, postal_code: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Address</button>
              </form>
              <hr />
              {getAddress.length > 0 ? (
                getAddress.map((address) => (
                  <div key={address.id} className="mb-3">
                    <ul className="list-unstyled">
                      <li><strong>Address:</strong> {address.address}</li>
                      <li><strong>City:</strong> {address.city}</li>
                      <li><strong>State:</strong> {address.state}</li>
                      <li><strong>Postal Code:</strong> {address.postal_code}</li>
                      <li>
                        <button className="btn btn-warning me-2" onClick={() => { setEditData(address); setModal(true); }}>Edit</button>
                        <button className="btn btn-danger" onClick={(e) => addDelete(address.id, e)}>Delete</button>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <p>No addresses found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {promodal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setPromodal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={updateProfile}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={proupdate.firstname}
                      onChange={(e) => setProupdate({ ...proupdate, firstname: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={proupdate.lastname}
                      onChange={(e) => setProupdate({ ...proupdate, lastname: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={proupdate.email}
                      onChange={(e) => setProupdate({ ...proupdate, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      value={proupdate.phonenumber}
                      onChange={(e) => setProupdate({ ...proupdate, phonenumber: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Address</h5>
                <button type="button" className="btn-close" onClick={() => setModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editAddress}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-control"
                      value={editData.state}
                      onChange={handleStateChange}
                    >
                      <option value="">Select State</option>
                      {statesList.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-control"
                      value={editData.city}
                      onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                    >
                      <option value="">Select City</option>
                      {citiesOptions.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Postal Code"
                      value={editData.postal_code}
                      onChange={(e) => setEditData({ ...editData, postal_code: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
