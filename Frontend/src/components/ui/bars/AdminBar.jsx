import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN_MENU } from '../../../utils/navigation';
import './Bars.css';

export default function AdminBar() {
  return (
    <aside className="sidebar-container glass-panel admin-theme">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Central Command</h2>
      </div>
      <nav className="sidebar-nav">
        {ADMIN_MENU.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="sidebar-icon" size={20} />
              <div className="sidebar-text">
                <span className="sidebar-item-title">{item.title}</span>
                <span className="sidebar-item-desc">{item.description}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
