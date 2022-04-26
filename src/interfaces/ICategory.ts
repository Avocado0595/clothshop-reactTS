import IProduct from './IProduct';

export default interface ICategory {
	title: string;
	id: number;
	imageUrl: string;
	routeName: string;
	items: IProduct[];
}
