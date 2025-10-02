import React, { useState, useRef, useEffect } from 'react';

// Simple Collapsible Component
export function Collapsible({ open, onOpenChange, children }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  const trigger = React.Children.toArray(children).find(child => child.type === CollapsibleTrigger);
  const content = React.Children.toArray(children).find(child => child.type === CollapsibleContent);

  return (
    <div>
      {React.cloneElement(trigger, { onClick: onOpenChange })}
      <div style={{ height: `${height}px`, overflow: 'hidden', transition: 'height 0.3s ease-in-out' }}>
          <div ref={contentRef}>
            {content}
          </div>
      </div>
    </div>
  );
}

export const CollapsibleTrigger = ({ children, onClick }) => <div onClick={onClick}>{children}</div>;
export const CollapsibleContent = ({ children }) => <div>{children}</div>;

// Simple Popover Component
export function Popover({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const trigger = React.Children.toArray(children).find(child => child.type === PopoverTrigger);
    const content = React.Children.toArray(children).find(child => child.type === PopoverContent);

    return (
        <div className="relative">
            {React.cloneElement(trigger, { onClick: () => setIsOpen(!isOpen)})}
            {isOpen && content}
        </div>
    );
};
export const PopoverTrigger = ({ children, onClick }) => <div onClick={onClick}>{children}</div>;
export const PopoverContent = ({ children, className }) => <div className={`absolute z-10 ${className}`}>{children}</div>;
