import { Button } from '@/components/common/button/button';
import { useEffect, useState } from 'react';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { AxiosResponse } from 'axios';
import { deleteStudent } from '@/app/api/student';
import { classDataProps, TeacherDataProps } from './types/types';
import { ControllerSelectField } from '../common/form/selectField';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { InferInput, minLength, object, pipe, string } from 'valibot';
import { createClass } from '@/app/api/class';

interface DeleteProps {
    setOpen: () => any;
    onDelete?: () => Promise<AxiosResponse<any, any> | undefined>;
    open: boolean;
    className: string;
    grade: string;
    teacherName: TeacherDataProps;
    teacher: TeacherDataProps[];
}

type ObjectInput = InferInput<typeof ObjectSchema>;

const ObjectSchema = object({
    teacher: pipe(string(), minLength(1, 'Teacher Name is required')),
});

export default function AddClass(props: DeleteProps) {
    const { className, setOpen, open, grade, teacher, teacherName } = props;
    const [data, setData] = useState<classDataProps | null>();

    const handleClose = () => {
        setOpen();
    };

    const handleCreate = async () => {};

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ObjectInput>({
        resolver: valibotResolver(ObjectSchema),
        defaultValues: {
            teacher: '',
        },
    });

    useEffect(() => {
        if (data) {
            //change based on types
            reset({
                teacher: data.name || '',
            });
        }
    }, [data, reset]);

    function getGradeId(grade: number): number {
        let grade_id: number = 0;

        switch (grade) {
            case 7:
                grade_id = 1;
                break;
            case 8:
                grade_id = 2;
                break;
            case 9:
                grade_id = 3;
                break;
            default:
                console.log('Grade not recognized');
                break;
        }
        return grade_id;
    }

    const onSubmit = async (data: ObjectInput) => {
        console.log(data);

        const newData: classDataProps = {
            id_grade: getGradeId(Number(grade)),
            id_teacher: Number(data.teacher),
            name: className,
        };

        console.log('newnewnewnew', newData);

        try {
            const response = await createClass(newData);

            if (response) {
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            }
        } catch (error) {
            console.error('API request error', error);
        }
    };

    console.log('teacherName', teacherName);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            maxWidth={'xs'}
            fullWidth={true}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='text-[#353535]'>
                <DialogTitle sx={{ color: '#0C4177' }} id='alert-dialog-title'>
                    Wali Kelas {grade}
                    {className}
                </DialogTitle>
                <DialogContent>
                    <ControllerSelectField
                        control={control}
                        name='teacher'
                        label='Teacher'
                        options={teacher.map((item: TeacherDataProps) => ({
                            value: item.teacher_id,
                            label: `${item.User.name}`,
                        }))}
                        placeholder='Please Teacher'
                        errors={errors.teacher}
                        value={teacherName?.teacher_id}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate} autoFocus type='submit'>
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
