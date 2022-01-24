import { catchAsync } from '@utils/ErrorUtil';
import { Request, Response } from 'express';

export const getGroupMessages = catchAsync((req: Request, res: Response) => {
	// const { name } = req.params;

	res.status(500).json('Unimplemented');
});

export const deleteGroupMessages = catchAsync((req: Request, res: Response) => {
	// const { name } = req.params;

	res.status(500).json('Unimplemented');
});
