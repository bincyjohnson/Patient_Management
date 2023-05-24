import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageView } from './actions';
import { useParams } from 'react-router-dom';

const MessageView = ({ id }) => {
  const { viewMessage } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(messageView(id));
  }, []);

  return (
    <>
      <div className="modal_body">
        <h3 className="text-center mb-5 hedi">Message Detail</h3>
        <div className="row  my-4 eachRow">
          <div className="col-6 colmid">Name</div>
          <div className="col-6 colmid">{viewMessage?.name}</div>
        </div>
        <div className="row  my-4 eachRow">
          <div className="col-6 colmid">Email</div>
          <div className="col-6 colmid">{viewMessage?.email}</div>
        </div>
        <div className="row  my-4 eachRow">
          <div className="col-6 colmid">Message</div>
          <div className="col-6 colmid">{viewMessage?.message}</div>
        </div>
      </div>
    </>
  );
};

export default MessageView;
