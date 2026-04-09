import React from 'react'
import Navbar from '../components/Navbar'
import './Admin.scss'

const pendingRequests = [
  {
    id: 1,
    title: "Advanced Robotics Lab",
    // department: "Mechanical Engineering",
    // professor: "Dr. Ananya Sharma",
    day: "Monday",
    time: "10:00 AM – 12:00 PM",
    room: "Room B-204",
  },
  {
    id: 2,
    title: "Data Science Workshop",
    department: "Computer Science",
    professor: "Prof. Rajesh Iyer",
    day: "Wednesday",
    time: "2:00 PM – 4:00 PM",
    room: "Room A-108",
  },
  {
    id: 3,
    title: "Organic Chemistry Practical",
    department: "Chemistry",
    professor: "Dr. Meera Patel",
    day: "Thursday",
    time: "9:00 AM – 11:00 AM",
    room: "Lab C-312",
  },
  {
    id: 4,
    title: "Structural Analysis Seminar",
    department: "Civil Engineering",
    professor: "Prof. Vikram Desai",
    day: "Friday",
    time: "1:00 PM – 3:00 PM",
    room: "Hall D-101",
  },
]

const Admin = () => {
  return (
    <>
      <Navbar />

      <main className="dashboard">
        {/* ── Header ─────────────────────────────── */}
        <header className="dashboard__header">
          <div className="dashboard__header-left">
            <h1 className="dashboard__page-title">Campus Spatial Admin</h1>
            <p className="dashboard__page-subtitle">Manage rooms, labs &amp; spatial requests</p>
          </div>
          {/* <div className="flex gap-100 dashboard__header-right">
            {/* Notification bell */}
            
            {/* Profile avatar */}
            
          {/* </div> */} 
          
           <div className="header__right">
                <button className="dashboard__icon-btn" aria-label="Notifications">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="dashboard__notif-badge">3</span>
                </button>

                <div className="dashboard__avatar">
                    <span>A</span>
                </div>
            </div>
        </header>

        

        {/* ── Overview Section ────────────────────── */}
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">Spatial Overview</h2>
          <p className="dashboard__section-desc">A quick look at current room allocation status across campus.</p>

          <div className="dashboard__cards">
            {/* Pending Card */}
            <div className="summary-card summary-card--warning">
              <div className="summary-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="summary-card__info">
                <span className="summary-card__label">Pending</span>
                <span className="summary-card__value">24</span>
              </div>
            </div>

            {/* Available Card */}
            <div className="summary-card summary-card--success">
              <div className="summary-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="summary-card__info">
                <span className="summary-card__label">Available</span>
                <span className="summary-card__value">142</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pending Requests ────────────────────── */}
        <section className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Pending Requests</h2>
            <div className="dashboard__section-actions">
              <button className="btn btn--outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filter by Department
              </button>
              <a href="#" className="dashboard__view-all">View All →</a>
            </div>
          </div>

          <div className="request-list">
            {pendingRequests.map((req) => (
              <div className="request-card" key={req.id}>
                <div className="request-card__body">
                  <div className="request-card__info">
                    <h3 className="request-card__title">{req.title}</h3>
                    <p className="request-card__subtitle">
                      {req.department} &middot; {req.professor}
                    </p>
                    <div className="request-card__tags">
                      <span className="tag tag--day">{req.day}</span>
                      <span className="tag tag--time">{req.time}</span>
                      <span className="tag tag--room">{req.room}</span>
                    </div>
                  </div>
                  <div className="request-card__actions">
                    <button className="btn btn--primary btn--sm">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Approve
                    </button>
                    <button className="btn btn--danger btn--sm">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Reject
                    </button>
                  </div>
                  <button className="btn btn--outline btn--sm">More info</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Admin