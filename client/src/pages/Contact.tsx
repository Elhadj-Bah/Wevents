import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact: React.FC = () => {
  const teamMembers = [
    { name: "Lauren Moore", github: "https://github.com/Lauren245" },
    { name: "Christian Walters", github: "https://github.com/EnderJunk" },
    { name: "Elhadj Bah", github: "https://github.com/Elhadj-Bah" },
    { name: "Dillon Duran", github: "https://github.com/Dillonduran" },
  ];

  return (
    <div className="container mt-4 frosted-glass">
      <h1 className="text-center mb-4">Contact Us!</h1>
      <div className="row">
        {teamMembers.map((member, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
