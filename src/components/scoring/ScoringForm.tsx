'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import ScoringEditFormSummary from './ScoringEditForm';
import ScoringSubjectForm from './AddScoringPerSubject';

const ScoringForm = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const subjectID = searchParams.get('subject');
    const classID = searchParams.get('class');


    return (
        <div className='min-h-screen w-full'>
            {type === 'summary' || type === 'update' ? <ScoringEditFormSummary /> : <ScoringSubjectForm />}
        </div>
    );
};

export default ScoringForm;
