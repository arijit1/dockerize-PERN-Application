import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Food from '../Food';

var postData = [{
    post_data: "Not Good Food",
    post_id: "postTestId1",
    post_name: "Raw Vegetables",
    post_type: "food",
    user_id: "853849",
},
{
    post_data: "Good Food",
    post_id: "postTestId2",
    post_name: "Rice",
    post_type: "food",
    user_id: "853849",
}, {
    post_data: "FastFood",
    post_id: "postTestId3",
    post_name: "Burger",
    post_type: "food",
    user_id: "853849",
}];

afterEach(cleanup);
it('succesfully post has been added', () => {
    const selector = render(<Food testPostData={postData} addPostTest={true} uname="tester" />);
    expect(selector.getAllByTestId('postTestId2')).toBeTruthy();
});

it('post with id "postTestId2" has been deleted', () => {
    let updatedData = [];
    function forEach(postData, callback) {

        postData.map((v) => {
            if (v.post_id != "postTestId2") {
                updatedData.push(v);
            }
        });
        for (let index = 0; index < updatedData.length; index++) {
            callback(updatedData[index]);
        }
    }
    const mockCallback = jest.fn();
    forEach(postData, mockCallback);
    //expect(mockCallback.mock.calls.length).toBe(2);
    //console.log(mockCallback);
    const selector = render(<Food testPostData={updatedData} addPostTest={true} uname="tester" />);
    //console.log(selector);
    expect(selector.getAllByTestId('postTestId1')).toBeTruthy();
});

it('deleting post by button click', () => {
    const onClick = jest.fn((deleteData) => {
        console.log("===========", deleteData);
    });
    const { getByText } = render(
        <Food testPostData={postData} uname="tester"  deletePostid="postTestId2" onClick={onClick} deleteTest={true} />);

    fireEvent.click(getByText(/Delete/i));

    //expect(onClick).toHaveBeenCalled();
});

