'use client';

import React from 'react';

interface StepCardProps {
  children: React.ReactNode;
}

export default function StepCard({ children }: StepCardProps) {
  return (<div className="step-enter">{children}</div>);
}
