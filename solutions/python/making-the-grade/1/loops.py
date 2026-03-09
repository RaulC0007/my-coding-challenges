def round_scores(student_scores):
    """Round all student scores to nearest integer."""
    return [round(score) for score in student_scores]

def count_failed_students(student_scores):
    """Count the number of failing students (score <= 40)."""
    return len([score for score in student_scores if score <= 40])

def above_threshold(student_scores, threshold):
    """Return list of scores that meet or exceed the threshold."""
    return [score for score in student_scores if score >= threshold]

def letter_grades(highest):
    """Calculate grade thresholds based on highest score."""
    step = (highest - 40) // 4
    return [41 + i * step for i in range(4)]

def student_ranking(student_scores, student_names):
    """Create ranked list of students with their scores."""
    return [f"{i+1}. {name}: {score}" 
            for i, (name, score) in enumerate(zip(student_names, student_scores))]

def perfect_score(student_info):
    """Find the first student with a perfect score (100)."""
    for student in student_info:
        if student[1] == 100:
            return student
    return []