use wasm_bindgen::prelude::*;
use meval::eval_str;

pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[wasm_bindgen]
pub fn evaluate(expression: &str) -> String {
    match eval_str(expression) {
        Ok(result) => result.to_string(),
        Err(_) => "Error".to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
