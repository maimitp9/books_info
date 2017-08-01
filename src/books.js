import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Books extends Component{
	propTypes:{
		books: PropTypes.array
	}
	constructor(){
		super();
		this.state= {books: (this.props.books || [])}
	}
	onBook(book){
		this.state.books.push(book)
		this.setState({
			books: this.state.books
		});
	}

  render(){
		const books = this.state.books.map((book) =>
			<Book title={book.title} author={book.read} />
		);
    return(
      <div>
				<BookForm onBook={this.onBook.bind(this)} />
        <table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Read</th>
						</tr>
					</thead>
					<tbody>
						{books}
					</tbody>
        </table>
      </div>
    );
  }
}

class Book extends Component {
	constructor(){
		super();
		this.state = {read: true};
	}
	handleChange(){
		this.setState({
			read: !this.state.read
		});
	}
	render(){
		return(
			<tr>
				<td>{this.props.title}</td>
				<td><input type="checkbox" checked={this.state.read} onChange={this.handleChange.bind(this)}/></td>
		</tr>
		);
	}
}

class BookForm extends Component {
	propTypes: {
		onBook: PropTypes.func
	}
	constructor(props){
		super(props);
		this.state = { title: '', read: false};
	}
	changeTitle(e){
		this.setState({
			title: e.target.value
		});
	}
	changeRead(){
		this.setState({
			read: !this.state.read
		});
	}
	addBook(e){
		e.preventDefault();

		this.props.onBook({
			title: this.state.title,
			read: this.state.read
		});

		this.setState({
			title: '',
			read: false
		});
	}

	render(){
		return(
			<form onSubmit={this.addBook}>
        <div>
          <label htmlFor='title'>Title</label>
          <div><input type='text' id='title' value={this.state.title} onChange={this.changeTitle.bind(this)} placeholder='Title' /></div>
        </div>
        <div>
          <label htmlFor='title'>Read</label>
          <div><input type='checkbox' id='read' checked={this.state.read} onChange={this.changeRead.bind(this)} /></div>
        </div>
        <div>
          <button type='submit'>Add Book</button>
        </div>
      </form>
		);
	}
}
