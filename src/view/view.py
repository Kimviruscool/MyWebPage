from flask import Blueprint, render_template

bp = Blueprint('main', __name__, url_prefix='/')

@bp.route('/')
def home():
    return render_template('home.html')

@bp.route('/calendar')
def calendar():
    return render_template('calendar.html')

@bp.route('/stocks')
def stocks():
    return render_template('stocks.html')

@bp.route('/coins')
def coins():
    return render_template('coins.html')

@bp.route('/guestbook')
def guestbook():
    return render_template('guestbook.html')

@bp.route('/commits')
def commits():
    return render_template('commits.html')

@bp.route('/record')
def record():
    return render_template('record.html')