import React, { FC } from 'react'
import './LoadingWraper.scss';
interface WithLoadingProps {
    loading: boolean;
  }
const LoadingSpinner:FC = () => <div>loading...</div>
  const withLoading = <P extends object>(
      Component: React.ComponentType<P>): React.FC<P & WithLoadingProps> => ({loading,...props
  }: WithLoadingProps) =>
    loading ? <LoadingSpinner /> : <Component {...(props as P)} />;

export default withLoading
/*
    withLoading nhận vào component, 
    <P extends object> ép kiểu tham số thành kiểu (object + P => props)  bắt buộc truyền tham số???
    React.ComponentType<P> = React.FunctionComponent<P> | React.ClassComponent<P>: Kiểu Component, nhận props là P
    trả về React.FC<P & WithLoadingProps>: funtional component có props = P & WithLoadingProps

*/